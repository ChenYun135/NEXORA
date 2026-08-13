import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { extname } from "node:path";

const tracked=execFileSync("git",["ls-files","--cached","--others","--exclude-standard"],{encoding:"utf8"}).split(/\r?\n/).filter(Boolean);
const forbiddenPath=[/^(?:research|papers|manuscripts|private|calibration)(?:\/|$)/i,/(?:^|\/)paper-?0[123](?:\/|$)/i,/(?:^|\/)(?:parameter-registr|scenario-output|review-notes?)(?:\/|$)/i,/^\.env(?:\.|$)/i,/(?:^|\/)\.git(?:\/|$)/i];
const binary=new Set([".png",".jpg",".jpeg",".webp",".gif",".ico",".woff",".woff2",".zip",".gz",".pdf"]);
const joined=(...parts)=>parts.join("");
const contentRules=[
  ["private research path",/(?:research[\\/]paper-?0[123]|papers?[\\/]|manuscripts?[\\/])/i],
  ["private model fingerprint",new RegExp(joined("model","[ _-]?v2|paper","[ _-]?0[123]|truth[ _-]?table|calibration[ _-]?panel|parameter[ _-]?registry"),"i")],
  ["private key",/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["credential assignment",/(?:OPENALEX|USPTO|CENSUS|BLS|BEA|OPENAI)_API_KEY\s*=\s*[^\s"']{8,}/i],
  ["local absolute path",/(?:[A-Z]:\\(?:Users|NEXORA)\\|\/Users\/[^/]+\/|\/home\/[^/]+\/)/i],
];
const exceptions=new Set(["scripts/public-boundary-scan.mjs",".gitignore",".env.example"]);
const findings=[];
for(const path of tracked){
  if(path===".env.example")continue;
  for(const rule of forbiddenPath)if(rule.test(path))findings.push(`${path}: forbidden path`);
  if(exceptions.has(path)||binary.has(extname(path).toLowerCase()))continue;
  let text="";try{text=readFileSync(path,"utf8")}catch{continue}
  for(const [name,rule] of contentRules)if(rule.test(text))findings.push(`${path}: ${name}`);
}
const counts={tracked:tracked.length,findings:findings.length,paperPublicFiles:findings.filter(x=>/research path|model fingerprint|paper-?0/i.test(x)).length,secrets:findings.filter(x=>/key|credential/i.test(x)).length,absolutePaths:findings.filter(x=>/absolute path/i.test(x)).length};
console.log(JSON.stringify(counts,null,2));
if(findings.length){console.error(findings.join("\n"));process.exitCode=1}
