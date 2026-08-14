import { createHash } from "node:crypto";
import type { ProviderRefreshPolicy, RefreshMode, RefreshReport, RefreshState, RevisionRecord, SnapshotRecord } from "../../domain/monthly-refresh.ts";

const PUBLIC_STATES: RefreshState[] = ["CURRENT","UPDATED","NO_NEW_RELEASE","STALE","DEGRADED","NOT_CONFIGURED","REVIEW_REQUIRED","FAILED"];
const PRIVATE_PATH = /(?:^|\/)(?:research|papers|manuscripts|paper-0[123]|calibration|private)(?:\/|$)/i;

export const validateRefreshRegistry = (rows: ProviderRefreshPolicy[]) => {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const row of rows) {
    if (!row.provider_id || ids.has(row.provider_id)) errors.push(`DUPLICATE_OR_MISSING_PROVIDER:${row.provider_id}`);
    ids.add(row.provider_id);
    if (!PUBLIC_STATES.includes(row.status)) errors.push(`INVALID_STATE:${row.provider_id}`);
    if (row.monthly_check_enabled !== true) errors.push(`MONTHLY_CHECK_DISABLED:${row.provider_id}`);
    if (!/^https:\/\//.test(row.official_url)) errors.push(`NON_OFFICIAL_URL:${row.provider_id}`);
    if (row.stale_after_days < 28) errors.push(`STALE_WINDOW_TOO_SHORT:${row.provider_id}`);
    if (row.requires_credentials && row.status === "FAILED" && row.failure_count === 0) errors.push(`CREDENTIAL_FAILURE_MISCLASSIFIED:${row.provider_id}`);
  }
  return errors;
};

export const publicFreshnessLabel = (state: RefreshState, lang: "en"|"zh") => ({
  CURRENT:lang === "zh" ? "当前有效" : "Current",
  UPDATED:lang === "zh" ? "本月已更新" : "Updated this month",
  NO_NEW_RELEASE:lang === "zh" ? "暂无新的官方发布" : "No new official release",
  STALE:lang === "zh" ? "数据已过时" : "Stale",
  DEGRADED:lang === "zh" ? "暂时不可用" : "Temporarily unavailable",
  NOT_CONFIGURED:lang === "zh" ? "尚未配置" : "Not configured",
  REVIEW_REQUIRED:lang === "zh" ? "需要人工复核" : "Review required",
  FAILED:lang === "zh" ? "刷新失败" : "Refresh failed",
})[state];

export const detectStaleState = (policy: ProviderRefreshPolicy, now: Date): RefreshState => {
  if (["NOT_CONFIGURED","REVIEW_REQUIRED","FAILED"].includes(policy.status)) return policy.status;
  const anchor = policy.last_successful_refresh ?? policy.last_checked_at;
  const ageDays = Math.floor((now.getTime() - Date.parse(anchor)) / 86_400_000);
  return ageDays > policy.stale_after_days ? "STALE" : policy.status;
};

export const compareSnapshots = (before: SnapshotRecord, after: SnapshotRecord) => ({
  changed: before.checksum !== after.checksum,
  record_count_delta: after.record_count - before.record_count,
  schema_changed: before.schema_version !== after.schema_version,
  coverage_changed: before.coverage !== after.coverage,
  large_unexpected_jump: before.record_count > 0 && Math.abs(after.record_count - before.record_count) / before.record_count > .25,
});

export const recordRevisions = (before: Record<string,string|number|null>, after: Record<string,string|number|null>, releaseVintage: string, revisionDate: string): RevisionRecord[] => Object.keys({...before,...after}).filter(key=>before[key]!==after[key]).map(key=>({record_id:String(after.id??before.id??"unknown"),field:key,old_value:before[key]??null,new_value:after[key]??null,release_vintage:releaseVintage,revision_date:revisionDate}));

export const immutableSnapshotId = (provider: string, releaseDate: string, payload: unknown) => {
  const checksum=createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  return {snapshot_id:`${provider.toLowerCase()}-${releaseDate}-${checksum.slice(0,12)}`,checksum};
};

export const ensurePublicOutputPaths = (paths: string[]) => {
  const blocked=paths.filter(path=>PRIVATE_PATH.test(path.replaceAll("\\","/")));
  if (blocked.length) throw new Error(`PRIVATE_OUTPUT_REJECTED:${blocked.join(",")}`);
  return true;
};

export const credentialHealth = (keys: string[], env: Record<string,string|undefined>) => Object.fromEntries(keys.map(key=>[key,Boolean(env[key])]));

export const redactOperationalError = (error: unknown) => {
  const raw=error instanceof Error?error.message:String(error);
  return raw.replace(/(?:api[_-]?key|token|secret|authorization)\s*[=:]\s*[^\s,;]+/gi,"$1=[REDACTED]").replace(/[A-Z]:\\[^\s]+/g,"[LOCAL_PATH_REDACTED]").slice(0,240);
};

export const buildRefreshReport = (policies: ProviderRefreshPolicy[], month: string, mode: RefreshMode, now: string): RefreshReport => ({
  month,
  generated_at:now,
  mode,
  providers_checked:policies.filter(row=>row.monthly_check_enabled).length,
  providers_updated:policies.filter(row=>row.status==="UPDATED").map(row=>row.provider_id),
  providers_unchanged:policies.filter(row=>["CURRENT","NO_NEW_RELEASE","REVIEW_REQUIRED"].includes(row.status)).map(row=>row.provider_id),
  providers_degraded:policies.filter(row=>["STALE","DEGRADED","FAILED"].includes(row.status)).map(row=>row.provider_id),
  providers_not_configured:policies.filter(row=>row.status==="NOT_CONFIGURED").map(row=>row.provider_id),
  qa_failures:policies.filter(row=>row.status==="FAILED").map(row=>({provider_id:row.provider_id,error_class:row.last_error_class??"REFRESH_FAILED"})),
  public_aggregates_changed:policies.some(row=>row.status==="UPDATED"),
  candidate_promoted:false,
  private_research_touched:false,
});

export const promotionAllowed = (checks:{schema:boolean;duplicates:boolean;missingness:boolean;suppression:boolean;units:boolean;geography:boolean;time:boolean;revisions:boolean;checksum:boolean}) => Object.values(checks).every(Boolean);

type FetchLike=(input:string|URL,init?:RequestInit)=>Promise<Response>;
type CacheEntry={expiresAt:number;response:{status:number;headers:Record<string,string>}};

export class SafeRefreshClient {
  private cache=new Map<string,CacheEntry>();
  private circuits=new Map<string,{failures:number;openedAt:number}>();
  private lastRequest=new Map<string,number>();
  private transport:FetchLike;
  private now:()=>number;
  constructor(transport:FetchLike=fetch,now:()=>number=Date.now){this.transport=transport;this.now=now}

  async probe(url:string,options:{timeoutMs?:number;maxRetries?:number;cacheTtlMs?:number;minIntervalMs?:number}={}) {
    const target=new URL(url);
    if(target.protocol!=="https:") throw new Error("NON_HTTPS_PROVIDER");
    const cacheKey=target.toString(),cached=this.cache.get(cacheKey);
    if(cached&&cached.expiresAt>this.now()) return {...cached.response,fromCache:true};
    const circuit=this.circuits.get(target.origin);
    if(circuit&&circuit.failures>=3&&this.now()-circuit.openedAt<300_000) throw new Error("PROVIDER_CIRCUIT_OPEN");
    const timeoutMs=options.timeoutMs??10_000,maxRetries=options.maxRetries??2,minIntervalMs=options.minIntervalMs??150;
    let last:unknown;
    for(let attempt=0;attempt<=maxRetries;attempt++){
      const since=this.now()-(this.lastRequest.get(target.origin)??0);
      if(since<minIntervalMs) await new Promise(resolve=>setTimeout(resolve,minIntervalMs-since));
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeoutMs);
      try{
        this.lastRequest.set(target.origin,this.now());
        const response=await this.transport(target,{method:"HEAD",redirect:"follow",signal:controller.signal,headers:{accept:"application/json,text/csv,text/html;q=0.8,*/*;q=0.5","user-agent":"NEXORA-monthly-public-data-check/1.0"}});
        if(response.status>=500||response.status===429) throw new Error(`UPSTREAM_${response.status}`);
        const result={status:response.status,headers:Object.fromEntries(["etag","last-modified","content-type"].map(key=>[key,response.headers.get(key)??""]))};
        this.cache.set(cacheKey,{expiresAt:this.now()+(options.cacheTtlMs??900_000),response:result});
        this.circuits.delete(target.origin);
        return {...result,fromCache:false};
      }catch(error){
        last=error;
        if(attempt<maxRetries) await new Promise(resolve=>setTimeout(resolve,Math.min(250*2**attempt,2_000)));
      }finally{clearTimeout(timer)}
    }
    const state=this.circuits.get(target.origin)??{failures:0,openedAt:this.now()};
    this.circuits.set(target.origin,{failures:state.failures+1,openedAt:state.openedAt});
    throw last instanceof Error?last:new Error("PROVIDER_PROBE_FAILED");
  }

  async paginate<T>(fetchPage:(cursor:string|null)=>Promise<{records:T[];nextCursor:string|null}>,maxPages=25){
    if(maxPages<1||maxPages>100) throw new Error("INVALID_PAGE_LIMIT");
    const records:T[]=[];let cursor:string|null=null;
    for(let page=0;page<maxPages;page++){const result=await fetchPage(cursor);records.push(...result.records);cursor=result.nextCursor;if(!cursor)return {records,truncated:false};}
    return {records,truncated:Boolean(cursor)};
  }
}

const credentialKey=(providerId:string)=>({CENSUS_ACS:"CENSUS_API_KEY",USPTO:"USPTO_API_KEY"} as Record<string,string>)[providerId];

export async function checkProviderMetadata(policies:ProviderRefreshPolicy[],env:Record<string,string|undefined>,client=new SafeRefreshClient(),checkedAt=new Date().toISOString()){
  const next=new Date(Date.UTC(Number(checkedAt.slice(0,4)),Number(checkedAt.slice(5,7)),3)).toISOString().slice(0,10);
  const results:ProviderRefreshPolicy[]=[];
  for(const policy of policies){
    const key=credentialKey(policy.provider_id);
    if(policy.requires_credentials&&key&&!env[key]){results.push({...policy,last_checked_at:checkedAt,next_expected_check:next,status:"NOT_CONFIGURED",failure_count:0,last_error_class:"CREDENTIAL_NOT_CONFIGURED"});continue}
    try{
      const response=await client.probe(policy.official_url);
      const status=response.status===405?"REVIEW_REQUIRED":policy.status==="UPDATED"?"CURRENT":policy.status;
      results.push({...policy,last_checked_at:checkedAt,next_expected_check:next,status,failure_count:0,last_error_class:null});
    }catch(error){
      const failures=policy.failure_count+1;
      results.push({...policy,last_checked_at:checkedAt,next_expected_check:next,status:failures>=3?"STALE":"DEGRADED",failure_count:failures,last_error_class:redactOperationalError(error).replace(/[^A-Z0-9_]/gi,"_").slice(0,80)});
    }
  }
  return results;
}
