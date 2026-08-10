import Link from "next/link";
import { notFound } from "next/navigation";

const modules: Record<string, { en:string; zh:string; desc:string; zhDesc:string; code:string }> = {
 atlas:{en:"NEXORA Atlas",zh:"NEXORA 产业图谱",desc:"Explore the global geography of future industries.",zhDesc:"探索未来产业的全球分布、连接与演进。",code:"02"},
 radar:{en:"Opportunity Radar",zh:"新兴机会雷达",desc:"Detect weak signals before they become consensus.",zhDesc:"在新兴趋势成为共识之前捕捉早期信号。",code:"03"},
 companies:{en:"Company Explorer",zh:"创新企业探索",desc:"Understand the organizations building the frontier.",zhDesc:"理解正在塑造产业前沿的创新组织。",code:"04"},
 ecosystems:{en:"Innovation Ecosystems",zh:"创新生态系统",desc:"Map connections between research, capital and policy.",zhDesc:"绘制科研、资本与政策之间的深层连接。",code:"05"},
 policy:{en:"Policy Intelligence",zh:"政策情报",desc:"Track the public decisions shaping emerging industries.",zhDesc:"追踪影响新兴产业发展的公共政策。",code:"06"},
 simulator:{en:"Ecosystem Simulator",zh:"生态系统模拟器",desc:"Model how interventions may change future outcomes.",zhDesc:"模拟关键干预如何改变未来结果。",code:"07"},
 ai:{en:"Nexora AI",zh:"Nexora AI 研究助手",desc:"Research across the future-industry knowledge graph.",zhDesc:"在未来产业知识图谱中开展跨领域研究。",code:"08"},
};
export default async function ModulePage({params}:{params:Promise<{module:string}>}){
 const {module}=await params; const item=modules[module]; if(!item) notFound();
 return <main className="module-shell"><div className="module-grid"/><Link href="/" className="module-back">← NEXORA / HOME · 首页</Link><div className="module-code">{item.code}</div><div className="module-content"><span>FOUNDATION PREVIEW · 基础版本预览</span><h1>{item.en}<small>{item.zh}</small></h1><p>{item.desc}<br/>{item.zhDesc}</p><div className="module-status"><i/> MODULE ARCHITECTURE READY · 模块架构已就绪</div></div></main>
}
