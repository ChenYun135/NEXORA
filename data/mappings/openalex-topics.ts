export interface OpenAlexTopicMapping {technologyId:string;topicIds:string[];version:string;confidence:"HIGH"|"MEDIUM"|"LOW";manualOverride:boolean;notes:{en:string;zh:string};reviewedAt:string;}
export const openAlexTopicMappingVersion="2026.08";
export const openAlexTopicMappings:OpenAlexTopicMapping[]=[
 {technologyId:"multimodal-ai",topicIds:["T11948"],version:"2026.08",confidence:"MEDIUM",manualOverride:true,notes:{en:"Pilot proxy uses Machine Learning in Materials Science; it is not the complete AI taxonomy.",zh:"试点代理主题为材料科学中的机器学习，不代表完整人工智能分类。"},reviewedAt:"2026-08-10"},
 {technologyId:"quantum-computing",topicIds:["T10682"],version:"2026.08",confidence:"HIGH",manualOverride:true,notes:{en:"Quantum Computing Algorithms and Architecture.",zh:"量子计算算法与架构。"},reviewedAt:"2026-08-10"},
 {technologyId:"synthetic-biology",topicIds:["T10932"],version:"2026.08",confidence:"MEDIUM",manualOverride:true,notes:{en:"Microbial metabolic engineering and bioproduction proxy.",zh:"微生物代谢工程与生物制造代理主题。"},reviewedAt:"2026-08-10"},
 {technologyId:"solid-state-batteries",topicIds:["T10281"],version:"2026.08",confidence:"HIGH",manualOverride:true,notes:{en:"Advanced Battery Materials and Technologies.",zh:"先进电池材料与技术。"},reviewedAt:"2026-08-10"}
];
