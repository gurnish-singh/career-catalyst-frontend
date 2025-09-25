export interface Project {
  id: string
  title: string
  description: string
  department: string
  requiredSkills: string[]
  duration: string
  priority: "high" | "medium" | "low"
  matchPercentage?: number
  status: "open" | "in-progress" | "completed"
  startDate?: Date
  endDate?: Date
}

export interface Skill {
  id: string
  name: string
  category: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  inDemand: boolean
  marketValue: number
}

export interface LearningPath {
  id: string
  title: string
  description: string
  skills: string[]
  estimatedDuration: string
  difficulty: "beginner" | "intermediate" | "advanced"
  progress: number
  modules: LearningModule[]
}

export interface LearningModule {
  id: string
  title: string
  description: string
  type: "video" | "article" | "exercise" | "project"
  duration: string
  completed: boolean
}

export interface CareerGoal {
  id: string
  title: string
  targetRole: string
  targetDepartment?: string
  timeline: string
  requiredSkills: string[]
  progress: number
  milestones: Milestone[]
}

export interface Milestone {
  id: string
  title: string
  description: string
  completed: boolean
  dueDate: Date
}

export interface Application {
  id: string
  projectId: string
  projectTitle: string
  status: "draft" | "submitted" | "under-review" | "accepted" | "rejected"
  submittedAt?: Date
  aiGenerated: boolean
  coverLetter?: string
}
