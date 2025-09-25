export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  department: string
  skills: string[]
  utilization: number
  availability: "available" | "partial" | "busy" | "unavailable"
  currentProjects: string[]
  performanceScore: number
  riskLevel: "low" | "medium" | "high"
  avatar?: string
  joinDate: Date
  lastActive: Date
}

export interface TalentMatch {
  employee: TeamMember
  matchPercentage: number
  matchingSkills: string[]
  missingSkills: string[]
  availabilityScore: number
  recommendationReason: string
}

export interface ResourceAlert {
  id: string
  type: "underutilized" | "overutilized" | "skill-gap" | "attrition-risk" | "opportunity"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  affectedEmployees: string[]
  suggestedAction: string
  createdAt: Date
  resolved: boolean
}

export interface ProjectStaffing {
  id: string
  projectName: string
  requiredSkills: string[]
  requiredHeadcount: number
  currentHeadcount: number
  priority: "low" | "medium" | "high" | "critical"
  startDate: Date
  endDate: Date
  status: "planning" | "staffing" | "in-progress" | "completed"
  budget: number
}

export interface SkillGap {
  skill: string
  currentLevel: number
  requiredLevel: number
  gap: number
  affectedProjects: string[]
  suggestedEmployees: string[]
}
