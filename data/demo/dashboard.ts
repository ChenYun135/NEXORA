export const kpis = [
  { key: "startups", value: "12,840", delta: "+18.4%" }, { key: "funding", value: "$86.2B", delta: "+12.1%" },
  { key: "patents", value: "48,921", delta: "+9.7%" }, { key: "papers", value: "126K", delta: "+24.3%" },
  { key: "policies", value: "2,416", delta: "+7.8%" }, { key: "talent", value: "4.2M", delta: "+15.6%" },
] as const;
export const opportunities = [
  { name: "AI Agents", zh: "AI 智能体", sector: "Artificial Intelligence", score: 94, trend: "+18.4%" },
  { name: "Synthetic Biology", zh: "合成生物学", sector: "Biotechnology", score: 89, trend: "+15.2%" },
  { name: "Advanced Batteries", zh: "先进电池", sector: "Clean Technology", score: 86, trend: "+13.8%" },
  { name: "Humanoid Robotics", zh: "人形机器人", sector: "Advanced Robotics", score: 84, trend: "+21.1%" },
  { name: "Quantum Computing", zh: "量子计算", sector: "Deep Technology", score: 81, trend: "+10.6%" },
] as const;
export const hotspots = [
  { city:"San Francisco Bay", zh:"旧金山湾区", country:"United States", score:92, startups:"3,240", research:"18.5K" },
  { city:"Shenzhen", zh:"深圳", country:"China", score:88, startups:"2,108", research:"14.2K" },
  { city:"Boston", zh:"波士顿", country:"United States", score:85, startups:"1,620", research:"21.8K" },
  { city:"Singapore", zh:"新加坡", country:"Singapore", score:82, startups:"1,230", research:"9.7K" },
] as const;
export const policies = [
  { type:"Strategy", zhType:"国家战略", name:"National Quantum Initiative", zh:"国家量子计划", org:"U.S. Government", year:"2025" },
  { type:"Funding", zhType:"资助计划", name:"Horizon Europe — EIC", zh:"地平线欧洲 — EIC", org:"European Commission", year:"2025" },
  { type:"Regulation", zhType:"监管政策", name:"AI Governance Framework", zh:"人工智能治理框架", org:"Singapore IMDA", year:"2024" },
] as const;
