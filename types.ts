export interface PainPoint {
  point: string;
  exampleQuote: string;
  emotionalImpact: string;
  workaround: string;
  cost: string;
}

export interface MarketAnalysisResult {
  painPoints: PainPoint[];
  insufficientSolutions: string;
  undervaluedSegment: string;
  idealSolution: string;
  confirmationMethods: string;
}

// Types for Competitor Analysis Agent
export interface Competitor {
  name: string;
  usp: string; // Unique Selling Proposition
  pricing: string;
  keyFeatures: string;
  customerLikes: string;
  customerComplaints: string;
  marketingStrategy: string;
  featureCompleteness: number;
}

export interface MarketGap {
  gap: string;
  description: string;
}

export interface CompetitorAnalysisResult {
  competitors: Competitor[];
  marketGaps: MarketGap[];
}

// Types for Go-to-Market Strategy Agent
export interface MarketIndicator {
  indicator: string;
  description: string;
}

export interface RedFlag {
  flag: string;
  description: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface GoToMarketStrategyResult {
  targetAudience: string;
  identifiedProblems: string;
  marketInterestIndicators: MarketIndicator[];
  redFlags: RedFlag[];
  groundingMetadata?: GroundingChunk[];
}

// Types for Trend Discovery Agent (Agent 0)
export interface TrendingTopic {
  topicName: string;
  reasonForTrend: string;
  exampleDiscussion: string;
}

export interface TrendDiscoveryResult {
  trendingTopics: TrendingTopic[];
  groundingMetadata?: GroundingChunk[];
}

// Types for Agent Solution (Agent 5)
export interface CoreFeature {
    feature: string;
    description: string;
    userProblemSolved: string;
}

export interface TechStackItem {
    category: 'Frontend' | 'Backend' | 'Database' | 'AI / ML Model' | 'Deployment' | 'Other';
    tool: string;
    justification: string;
}

export interface RoadmapPhase {
    phase: string;
    duration: string;
    milestones: string[];
}

export interface Risk {
    risk: string;
    mitigation: string;
}

export interface AgentSolutionResult {
    solutionOverview: string;
    coreFeatures: CoreFeature[];
    techStack: TechStackItem[];
    implementationRoadmap: RoadmapPhase[];
    risksAndMitigations: Risk[];
    ethicalConsiderations: string;
    groundingMetadata?: GroundingChunk[];
}