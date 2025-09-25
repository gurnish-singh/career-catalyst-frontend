export interface OrganizationalMetrics {
  totalEmployees: number
  overallUtilization: number
  retentionRate: number
  skillsGrowth: number
  costSavings: number
  internalMobility: number
  timeToFill: number
  employeeSatisfaction: number
}

export interface DepartmentMetrics {
  id: string
  name: string
  headcount: number
  utilization: number
  avgPerformance: number
  retentionRate: number
  skillsGrowth: number
  budget: number
  budgetUtilization: number
  keySkills: string[]
  riskLevel: "low" | "medium" | "high"
}

export interface SkillHeatmapData {
  skill: string
  category: string
  currentSupply: number
  marketDemand: number
  internalDemand: number
  gap: number
  trend: "increasing" | "stable" | "decreasing"
  criticalityScore: number
}

export interface AttritionRisk {
  employeeId: string
  employeeName: string
  department: string
  role: string
  riskScore: number
  riskFactors: string[]
  suggestedActions: string[]
  timeframe: string
  impactLevel: "low" | "medium" | "high" | "critical"
}

export interface StrategicInsight {
  id: string
  type: "opportunity" | "risk" | "trend" | "recommendation"
  priority: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  impact: string
  suggestedActions: string[]
  affectedDepartments: string[]
  timeline: string
  roi: number
  createdAt: Date
}

export interface WorkforceProjection {
  period: string
  totalHeadcount: number
  projectedHires: number
  projectedAttrition: number
  skillsNeeded: string[]
  budgetImpact: number
}
