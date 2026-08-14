import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import type { ProviderRefreshPolicy, RefreshMode } from "../domain/monthly-refresh.ts";
import { buildRefreshReport, checkProviderMetadata, credentialHealth, ensurePublicOutputPaths, validateRefreshRegistry } from "../services/public-data/monthly-refresh.ts";

const args=process.argv.slice(2);
const option=(name:string)=>{const index=args.indexOf(name);return index>=0?args[index+1]:undefined};
const mode=(option("--mode")??"metadata-only") as RefreshMode;
const provider=option("--provider");
const checkOnly=args.includes("--check-only");
if(!["full","single-provider","metadata-only"].includes(mode)) throw new Error("INVALID_REFRESH_MODE");
if(mode==="single-provider"&&!provider) throw new Error("SINGLE_PROVIDER_REQUIRED");

const root=process.cwd();
const registryPath=resolve(root,"data/operations/provider-refresh-registry.json");
const rows=JSON.parse(await readFile(registryPath,"utf8")) as ProviderRefreshPolicy[];
const selected=provider?rows.filter(row=>row.provider_id===provider):rows;
if(provider&&selected.length!==1) throw new Error("UNKNOWN_PROVIDER");
const registryErrors=validateRefreshRegistry(rows);
if(registryErrors.length) throw new Error(`REFRESH_REGISTRY_INVALID:${registryErrors.join("|")}`);

const now=new Date();
const checkedAt=now.toISOString();
const month=checkedAt.slice(0,7);
const credentials=credentialHealth(["CENSUS_API_KEY","USPTO_API_KEY","BEA_API_KEY","OPENALEX_API_KEY","BLS_API_KEY"],process.env);
const checked=await checkProviderMetadata(selected,process.env,undefined,checkedAt);
const byProvider=new Map(checked.map(row=>[row.provider_id,row]));
const updated=rows.map(row=>byProvider.get(row.provider_id)??row);
const report=buildRefreshReport(updated.filter(row=>selected.some(item=>item.provider_id===row.provider_id)),month,mode,checkedAt);
const outputDir=resolve(root,"data/operations/reports");
const jsonPath=resolve(outputDir,`MONTHLY_DATA_REFRESH_REPORT_${month.replace("-","_")}.json`);
const markdownPath=resolve(outputDir,`MONTHLY_DATA_REFRESH_REPORT_${month.replace("-","_")}.md`);
ensurePublicOutputPaths([registryPath,jsonPath,markdownPath]);

if(!checkOnly){
  await mkdir(dirname(jsonPath),{recursive:true});
  await writeFile(registryPath,`${JSON.stringify(updated,null,2)}\n`,"utf8");
  await writeFile(jsonPath,`${JSON.stringify({...report,credential_configuration:Object.fromEntries(Object.entries(credentials).map(([key,value])=>[key,value?"CONFIGURED":"NOT_CONFIGURED"]))},null,2)}\n`,"utf8");
  const summary=[`# Monthly data refresh — ${month}`,"",`- Providers checked: ${report.providers_checked}`,`- Updated: ${report.providers_updated.length}`,`- No change / review: ${report.providers_unchanged.length}`,`- Degraded: ${report.providers_degraded.length}`,`- Not configured: ${report.providers_not_configured.length}`,`- Public aggregates changed: ${report.public_aggregates_changed?"yes":"no"}`,"","This run checks official sources according to their native cadence. No new annual release is a normal result, not a failure.","","Private research datasets and frozen analysis snapshots are outside this workflow."].join("\n");
  await writeFile(markdownPath,`${summary}\n`,"utf8");
}
console.log(JSON.stringify({mode,provider:provider??"ALL",checkOnly,report,credential_configuration:Object.fromEntries(Object.entries(credentials).map(([key,value])=>[key,value?"CONFIGURED":"NOT_CONFIGURED"]))},null,2));
if(report.qa_failures.length) process.exitCode=1;
