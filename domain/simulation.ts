import type { LocalizedText } from "./models";
import type { PublicDataStatus } from "./public-data";

export type ModelStatus="PROTOTYPE"|"PARTIALLY_CALIBRATED"|"CALIBRATED"|"VALIDATED";
export type AssumptionType="OBSERVED_CALIBRATED"|"DERIVED_CALIBRATED"|"LITERATURE_ASSUMPTION"|"NEXORA_ASSUMPTION"|"USER_SCENARIO_INPUT"|"DEMO";
export type CausalStatus="LITERATURE_SUPPORTED"|"THEORY_SUPPORTED"|"DATA_ASSOCIATION_ONLY"|"NEXORA_ASSUMPTION"|"DEMO";
export type SimulationStatus="PENDING"|"RUNNING"|"SUCCESS"|"PARTIAL"|"FAILED";
export type ModelWarningCode="LOW_DATA_COVERAGE"|"ASSUMPTION_HEAVY"|"MISSING_PATENT_CALIBRATION"|"UNSTABLE_PARAMETER_SET"|"EXTRAPOLATION"|"OUTSIDE_CALIBRATION_RANGE"|"CLAMPED_STOCK"|"UNSUPPORTED_CONTEXT";
export type ParameterGroup="POLICY"|"RESEARCH"|"COMMERCIALIZATION"|"TALENT"|"ECOSYSTEM"|"MARKET"|"DELAYS";
export type StockId="researchCapacity"|"knowledgeStock"|"commercializationCapacity"|"startupBase"|"talentPool"|"infrastructure"|"policySupport"|"connectivity"|"marketAdoption";
export type OutputId=StockId|"innovationOutput"|"talentPressure";
export type ParameterId="publicResearchSupport"|"commercializationGrants"|"taxIncentiveStrength"|"researchInfrastructure"|"workforceDevelopment"|"publicProcurement"|"coordinationSupport"|"researchProductivity"|"knowledgeRetention"|"technologyTransferRate"|"commercializationEfficiency"|"startupFormationRate"|"startupSurvivalRate"|"talentGrowthRate"|"talentConstraint"|"knowledgeDiffusionRate"|"networkConnectivityEffect"|"relationshipDiversity"|"bridgeDependency"|"marketAdoptionRate"|"policyImplementationEfficiency"|"capitalAvailability"|"researchCommercializationLag"|"policyImplementationLag"|"infrastructureLag"|"talentDevelopmentLag";

export interface ModelVariable {id:string;name:LocalizedText;description:LocalizedText;unit:string;equationId:string;evidenceStatus:AssumptionType;}
export interface StockVariable extends ModelVariable {kind:"STOCK";initialValue:number;minimum:number;maximum:number;}
export interface FlowVariable extends ModelVariable {kind:"FLOW";fromStock:StockId|null;toStock:StockId|null;}
export interface AuxiliaryVariable extends ModelVariable {kind:"AUXILIARY";}
export interface ModelParameter {id:ParameterId;name:LocalizedText;description:LocalizedText;group:ParameterGroup;unit:string;defaultValue:number;min:number;max:number;step:number;source:string;evidenceStatus:PublicDataStatus|"ASSUMPTION";assumptionType:AssumptionType;sensitivityRange:[number,number];modelChannel:LocalizedText;basic:boolean;}
export interface CausalAssumption {id:string;sourceVariable:string;targetVariable:string;direction:"POSITIVE"|"NEGATIVE";functionalForm:string;lag:number;evidenceBasis:LocalizedText;confidence:"LOW"|"MEDIUM"|"HIGH";assumptionStatus:CausalStatus;methodologyReference:string;}
export interface ModelEquation {id:string;targetVariable:string;expression:string;description:LocalizedText;units:string;dependencies:string[];version:string;assumptionIds:string[];}
export interface CausalLink {id:string;from:string;to:string;direction:"POSITIVE"|"NEGATIVE";lag:number;assumptionId:string;}
export interface FeedbackLoop {id:string;name:LocalizedText;type:"REINFORCING"|"BALANCING";variableIds:string[];description:LocalizedText;}
export interface NetworkModifierConfig {id:string;targetParameter:ParameterId;input:string;formula:string;minimum:number;maximum:number;status:AssumptionType;limitations:LocalizedText;}
export interface SimulationModel {id:string;name:LocalizedText;version:string;equationVersion:string;solverVersion:string;status:ModelStatus;modelType:"CONCEPTUAL_RESEARCH_MODEL";timeStep:"ANNUAL";supportedHorizons:number[];stocks:StockVariable[];flows:FlowVariable[];auxiliaries:AuxiliaryVariable[];parameters:ModelParameter[];equations:ModelEquation[];causalAssumptions:CausalAssumption[];causalLinks:CausalLink[];feedbackLoops:FeedbackLoop[];networkModifiers:NetworkModifierConfig[];}
export interface EcosystemContext {regionId:string|null;industryId:string|null;technologyId:string|null;ecosystemId:string|null;policyId:string|null;}
export interface Scenario {id:string;name:LocalizedText;description:LocalizedText;baseSnapshotId:string;modelVersion:string;timeHorizon:5|10|15;parameters:Partial<Record<ParameterId,number>>;assumptions:string[];createdAt:string;dataCoverage:CalibrationCoverage;isDemo:boolean;isSaved:boolean;}
export interface SimulationPoint {year:number;values:Record<StockId,number>;auxiliaries:{innovationOutput:number;talentPressure:number;researchCreation:number;commercializationFlow:number;startupFormation:number;};}
export interface SimulationSeries {id:OutputId;name:LocalizedText;unit:string;points:{year:number;value:number}[];}
export interface SimulationOutput {series:SimulationSeries[];finalValues:Record<OutputId,number>;baselineDeltas?:Partial<Record<OutputId,{absolute:number;relative:number|null}>>;bottleneck:{id:string;label:LocalizedText;value:number;rule:string};}
export interface ModelWarning {code:ModelWarningCode;severity:"INFO"|"WARNING"|"CRITICAL";message:LocalizedText;}
export interface RunQuality {finite:boolean;nonNegative:boolean;timeOrdered:boolean;clampedCount:number;coverage:CalibrationCoverage;}
export interface SimulationRun {id:string;scenarioId:string;modelVersion:string;inputSnapshotIds:string[];startedAt:string;completedAt:string;status:SimulationStatus;timeHorizon:number;timeStep:"ANNUAL";parameters:Record<ParameterId,number>;assumptions:string[];outputs:SimulationOutput;warnings:ModelWarning[];quality:RunQuality;reproducibilityHash:string;context:EcosystemContext;}
export interface SensitivityResult {parameterId:ParameterId;parameterName:LocalizedText;range:[number,number];outputId:OutputId;points:{parameterValue:number;outputValue:number}[];outputRange:[number,number];sensitivityStrength:number;}
export interface SensitivityRun {id:string;scenarioId:string;outputId:OutputId;results:SensitivityResult[];modelVersion:string;reproducibilityHash:string;}
export interface UncertaintyConfig {data:boolean;parameter:boolean;structural:boolean;scenario:boolean;monteCarlo:{enabled:false;reason:string};}
export interface CalibrationRecord {id:string;variableId:string;classification:AssumptionType;sourceId:string|null;metricKey:string|null;transformation:string;inputSnapshotId:string|null;timeWindow:string|null;confidence:"LOW"|"MEDIUM"|"HIGH";limitations:LocalizedText;}
export interface CalibrationCoverage {observed:number;derived:number;assumption:number;unavailable:number;basis:string;}
export interface ModelEvidence {id:string;title:LocalizedText;classification:"OBSERVED_EVIDENCE"|"DERIVED_INPUT"|"SCENARIO_INPUT"|"MODEL_ASSUMPTION"|"UNAVAILABLE_INPUT";sourceUrl:string|null;sourceId:string|null;snapshotId:string|null;modelVariableIds:string[];notes:LocalizedText;}
export interface ModelValidationResult {valid:boolean;errors:string[];warnings:ModelWarning[];}
