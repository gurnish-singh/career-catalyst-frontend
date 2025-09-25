export interface SkillMatch {
  skill: string
  proficiency: number
  required: number
  gap: number
  priority: "high" | "medium" | "low"
}

export interface TalentMatch {
  employeeId: string
  employeeName: string
  department: string
  role: string
  matchScore: number
  skillMatches: SkillMatch[]
  availabilityScore: number
  culturalFit: number
  growthPotential: number
  riskFactors: string[]
  recommendations: string[]
}

export interface OpportunityMatch {
  opportunityId: string
  title: string
  department: string
  type: "project" | "role" | "assignment"
  requiredSkills: string[]
  matchedTalent: TalentMatch[]
  urgency: "high" | "medium" | "low"
  estimatedDuration: string
  budgetImpact: number
}

export interface CareerPathRecommendation {
  employeeId: string
  currentRole: string
  targetRole: string
  pathSteps: {
    step: number
    role: string
    requiredSkills: string[]
    estimatedTimeframe: string
    learningResources: string[]
  }[]
  successProbability: number
  timeToTarget: string
  skillGaps: SkillMatch[]
}

export interface AttritionRiskPrediction {
  employeeId: string
  employeeName: string
  department: string
  riskScore: number
  riskLevel: "high" | "medium" | "low"
  keyFactors: {
    factor: string
    impact: number
    description: string
  }[]
  interventions: {
    type: string
    description: string
    expectedImpact: number
  }[]
  timeframe: string
}
