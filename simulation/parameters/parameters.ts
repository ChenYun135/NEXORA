import type { ModelParameter,ParameterId } from "../../domain/simulation.ts";

const p=(id:ParameterId,en:string,zh:string,group:ModelParameter["group"],defaultValue:number,min:number,max:number,step:number,basic:boolean,channelEn:string,channelZh:string,assumptionType:ModelParameter["assumptionType"]="NEXORA_ASSUMPTION",source="NEXORA conceptual model v1"):ModelParameter=>({id,name:{en,zh},description:{en:`Controls ${en.toLowerCase()} in the conceptual scenario model.`,zh:`控制概念情景模型中的${zh}。`},group,unit:id.endsWith("Lag")?"years":"index / rate",defaultValue,min,max,step,source,evidenceStatus:assumptionType.includes("CALIBRATED")?(assumptionType.startsWith("OBSERVED")?"OBSERVED":"DERIVED"):"ASSUMPTION",assumptionType,sensitivityRange:[Math.max(min,defaultValue-(max-min)*.2),Math.min(max,defaultValue+(max-min)*.2)],modelChannel:{en:channelEn,zh:channelZh},basic});

export const modelParameters:ModelParameter[]=[
 p("publicResearchSupport","Public R&D support","公共研发支持","POLICY",.50,0,1,.05,true,"policy → research capacity","政策 → 科研能力"),
 p("commercializationGrants","Commercialization grants","商业化资助","POLICY",.40,0,1,.05,true,"policy → commercialization","政策 → 商业化"),
 p("taxIncentiveStrength","Tax / incentive strength","税收与激励强度","POLICY",.30,0,1,.05,false,"incentives → startup formation","激励 → 创业形成"),
 p("researchInfrastructure","Research infrastructure","科研基础设施","POLICY",.45,0,1,.05,true,"investment → delayed infrastructure","投入 → 延迟基础设施"),
 p("workforceDevelopment","Workforce development","人才发展支持","POLICY",.40,0,1,.05,true,"workforce policy → delayed talent","人才政策 → 延迟人才供给"),
 p("publicProcurement","Public procurement support","公共采购支持","POLICY",.30,0,1,.05,false,"procurement → market adoption","采购 → 市场吸纳"),
 p("coordinationSupport","Standards / coordination","标准与协调支持","POLICY",.40,0,1,.05,false,"coordination → connectivity","协调 → 生态连接"),
 p("researchProductivity","Research productivity","科研生产率","RESEARCH",.055,.01,.10,.005,false,"research capacity → research creation","科研能力 → 研究创造","DERIVED_CALIBRATED","OpenAlex 2020–2025 mapped-topic trend range"),
 p("knowledgeRetention","Knowledge retention","知识保留率","RESEARCH",.94,.80,.99,.01,false,"knowledge stock → retained knowledge","知识存量 → 保留知识"),
 p("technologyTransferRate","Technology transfer rate","技术转移率","COMMERCIALIZATION",.08,.01,.20,.01,true,"knowledge → commercialization","知识 → 商业化"),
 p("commercializationEfficiency","Commercialization efficiency","商业化效率","COMMERCIALIZATION",.12,.03,.30,.01,true,"transfer flow → capacity","转移流 → 商业化能力"),
 p("startupFormationRate","Startup formation rate","创业形成率","COMMERCIALIZATION",.08,.01,.20,.01,false,"commercialization → startup base","商业化 → 创业基础"),
 p("startupSurvivalRate","Startup survival rate","创业存续率","COMMERCIALIZATION",.90,.65,.98,.01,false,"startup base → attrition","创业基础 → 退出"),
 p("talentGrowthRate","Talent growth rate","人才增长率","TALENT",.035,0,.10,.005,false,"workforce support → talent pool","人才支持 → 人才池"),
 p("talentConstraint","Talent constraint","人才约束","TALENT",.25,0,.80,.05,true,"constraint → slower growth","约束 → 增长放缓"),
 p("knowledgeDiffusionRate","Knowledge diffusion rate","知识扩散率","ECOSYSTEM",.10,.01,.25,.01,false,"connectivity → knowledge flow","连接 → 知识流动"),
 p("networkConnectivityEffect","Network connectivity effect","网络连接效应","ECOSYSTEM",.15,0,.35,.01,true,"connectivity → diffusion and transfer","连接 → 扩散与转移"),
 p("relationshipDiversity","Relationship diversity","关系多样性","ECOSYSTEM",.50,0,1,.05,false,"diversity → network resilience","多样性 → 网络韧性"),
 p("bridgeDependency","Bridge dependency","桥接依赖","ECOSYSTEM",.35,0,1,.05,false,"dependency → fragility penalty","依赖 → 脆弱性惩罚"),
 p("marketAdoptionRate","Market adoption rate","市场吸纳率","MARKET",.08,.01,.20,.01,true,"commercialization → adoption","商业化 → 市场吸纳"),
 p("policyImplementationEfficiency","Policy implementation efficiency","政策实施效率","POLICY",.65,.20,1,.05,false,"policy input → effective support","政策输入 → 有效支持"),
 p("capitalAvailability","Capital availability","资本可得性","MARKET",.45,0,1,.05,false,"capital assumption → startup formation","资本假设 → 创业形成"),
 p("researchCommercializationLag","Research-to-commercialization lag","科研到商业化时滞","DELAYS",2,0,4,1,false,"knowledge → delayed transfer","知识 → 延迟转移"),
 p("policyImplementationLag","Policy implementation lag","政策实施时滞","DELAYS",1,0,3,1,false,"policy announcement → implementation","政策发布 → 实施"),
 p("infrastructureLag","Infrastructure capacity lag","基础设施形成时滞","DELAYS",2,0,4,1,false,"investment → capacity","投入 → 能力"),
 p("talentDevelopmentLag","Talent development lag","人才发展时滞","DELAYS",2,0,5,1,false,"workforce support → labor supply","人才支持 → 劳动力供给")
];

export const defaultParameters=Object.fromEntries(modelParameters.map(x=>[x.id,x.defaultValue])) as Record<ParameterId,number>;
