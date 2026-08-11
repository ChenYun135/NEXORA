export interface PatentTaxonomyMapping {technologyId:string;classificationFamily:"CPC"|"IPC";includeCodes:string[];excludeCodes:string[];version:string;confidence:"HIGH"|"MEDIUM"|"LOW";notes:string;reviewStatus:"PILOT"|"REVIEWED";}
export const patentTaxonomyMappings:PatentTaxonomyMapping[]=[
 {technologyId:"quantum-computing",classificationFamily:"CPC",includeCodes:["G06N10/00"],excludeCodes:[],version:"2026.08-pilot",confidence:"HIGH",notes:"CPC quantum computing pilot; API validation awaits USPTO key.",reviewStatus:"PILOT"},
 {technologyId:"solid-state-batteries",classificationFamily:"CPC",includeCodes:["H01M10/0562"],excludeCodes:[],version:"2026.08-pilot",confidence:"MEDIUM",notes:"Solid electrolyte pilot; not equivalent to the full battery industry.",reviewStatus:"PILOT"},
 {technologyId:"humanoid-robotics",classificationFamily:"CPC",includeCodes:["B25J9/00"],excludeCodes:[],version:"2026.08-pilot",confidence:"LOW",notes:"Broad programme-controlled manipulators class; manual refinement required.",reviewStatus:"PILOT"}
];
