import type { AIAnswerType } from "../../domain/ai.ts";

export const AI_PROMPT_VERSION="nexora-ai-1.0.0";
export const AI_RETRIEVAL_VERSION="nexora-retrieval-1.0.0";
export interface AIConfig {maxQueryLength:number;maxEvidenceItems:number;maxEvidenceTextPerItem:number;maxConversationTurns:number;maxAnswerLength:number;timeoutMs:number;retryCount:number;allowDemoEvidence:boolean;defaultAnswerMode:AIAnswerType;maxRequestsPerMinute:number;}
export const aiConfig:AIConfig={maxQueryLength:600,maxEvidenceItems:24,maxEvidenceTextPerItem:420,maxConversationTurns:6,maxAnswerLength:1800,timeoutMs:20_000,retryCount:1,allowDemoEvidence:false,defaultAnswerMode:"QUICK_ANSWER",maxRequestsPerMinute:30};
export const AI_FEATURE_FLAG="NEXORA_AI_ENABLED";
