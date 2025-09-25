import type { TalentMatch, CareerPathRecommendation, AttritionRiskPrediction, SkillMatch } from "@/types/ai-matching"

// Simulated AI matching algorithms
export class AIMatchingEngine {
  // Core matching algorithm for talent to opportunities
  static matchTalentToOpportunity(employees: any[], opportunity: any): TalentMatch[] {
    return employees
      .map((employee) => {
        const skillMatches = this.calculateSkillMatches(employee.skills, opportunity.requiredSkills)
        const matchScore = this.calculateOverallMatchScore(employee, opportunity, skillMatches)

        return {
          employeeId: employee.id,
          employeeName: employee.name,
          department: employee.department,
          role: employee.role,
          matchScore,
          skillMatches,
          availabilityScore: this.calculateAvailabilityScore(employee),
          culturalFit: this.calculateCulturalFit(employee, opportunity),
          growthPotential: this.calculateGrowthPotential(employee),
          riskFactors: this.identifyRiskFactors(employee),
          recommendations: this.generateRecommendations(employee, opportunity, skillMatches),
        }
      })
      .sort((a, b) => b.matchScore - a.matchScore)
  }

  // Calculate skill gap analysis
  static calculateSkillMatches(employeeSkills: any[], requiredSkills: string[]): SkillMatch[] {
    return requiredSkills.map((skill) => {
      const employeeSkill = employeeSkills.find((s) => s.name.toLowerCase() === skill.toLowerCase())
      const proficiency = employeeSkill ? employeeSkill.level : 0
      const required = 80 // Assume 80% proficiency required
      const gap = Math.max(0, required - proficiency)

      return {
        skill,
        proficiency,
        required,
        gap,
        priority: gap > 40 ? "high" : gap > 20 ? "medium" : "low",
      }
    })
  }

  // Calculate overall match score using weighted factors
  static calculateOverallMatchScore(employee: any, opportunity: any, skillMatches: SkillMatch[]): number {
    const skillScore =
      (skillMatches.reduce((acc, match) => acc + match.proficiency / match.required, 0) / skillMatches.length) * 100

    const experienceScore = this.calculateExperienceScore(employee, opportunity)
    const availabilityScore = this.calculateAvailabilityScore(employee)
    const culturalFit = this.calculateCulturalFit(employee, opportunity)

    // Weighted average
    return Math.round(skillScore * 0.4 + experienceScore * 0.3 + availabilityScore * 0.2 + culturalFit * 0.1)
  }

  // Calculate experience relevance score
  static calculateExperienceScore(employee: any, opportunity: any): number {
    const relevantExperience =
      employee.experience?.filter((exp: any) =>
        exp.skills?.some((skill: string) => opportunity.requiredSkills.includes(skill)),
      ) || []

    return Math.min(100, relevantExperience.length * 25)
  }

  // Calculate availability score based on current workload
  static calculateAvailabilityScore(employee: any): number {
    const currentUtilization = employee.utilization || 75
    return Math.max(0, 100 - currentUtilization)
  }

  // Calculate cultural fit score
  static calculateCulturalFit(employee: any, opportunity: any): number {
    // Simplified cultural fit calculation
    const departmentMatch = employee.department === opportunity.department ? 20 : 0
    const roleTypeMatch = employee.preferences?.includes(opportunity.type) ? 30 : 0
    const collaborationScore = employee.collaborationRating || 50

    return departmentMatch + roleTypeMatch + collaborationScore
  }

  // Calculate growth potential
  static calculateGrowthPotential(employee: any): number {
    const performanceScore = employee.performanceRating || 75
    const learningVelocity = employee.learningVelocity || 70
    const careerAmbition = employee.careerAmbition || 80

    return Math.round((performanceScore + learningVelocity + careerAmbition) / 3)
  }

  // Identify risk factors for employee
  static identifyRiskFactors(employee: any): string[] {
    const risks: string[] = []

    if (employee.utilization > 90) risks.push("High workload stress")
    if (
      employee.lastPromotion &&
      Date.now() - new Date(employee.lastPromotion).getTime() > 365 * 24 * 60 * 60 * 1000 * 2
    ) {
      risks.push("No recent career progression")
    }
    if (employee.skillsGrowth < 10) risks.push("Limited skill development")
    if (employee.satisfactionScore < 70) risks.push("Low job satisfaction")

    return risks
  }

  // Generate personalized recommendations
  static generateRecommendations(employee: any, opportunity: any, skillMatches: SkillMatch[]): string[] {
    const recommendations: string[] = []

    const highGapSkills = skillMatches.filter((s) => s.priority === "high")
    if (highGapSkills.length > 0) {
      recommendations.push(`Focus on developing ${highGapSkills[0].skill} skills`)
    }

    if (employee.utilization > 85) {
      recommendations.push("Consider workload rebalancing before assignment")
    }

    if (opportunity.type === "leadership" && employee.leadershipExperience < 2) {
      recommendations.push("Pair with senior mentor for leadership development")
    }

    return recommendations
  }

  // Generate career path recommendations
  static generateCareerPath(employee: any, targetRole: string): CareerPathRecommendation {
    // Simplified career path generation
    const pathSteps = [
      {
        step: 1,
        role: `Senior ${employee.role}`,
        requiredSkills: ["Advanced Technical Skills", "Mentoring"],
        estimatedTimeframe: "6-12 months",
        learningResources: ["Senior Developer Course", "Mentoring Workshop"],
      },
      {
        step: 2,
        role: `Lead ${employee.role}`,
        requiredSkills: ["Team Leadership", "Project Management"],
        estimatedTimeframe: "12-18 months",
        learningResources: ["Leadership Training", "Agile Certification"],
      },
      {
        step: 3,
        role: targetRole,
        requiredSkills: ["Strategic Planning", "Cross-functional Leadership"],
        estimatedTimeframe: "18-24 months",
        learningResources: ["Executive Leadership Program", "MBA Courses"],
      },
    ]

    return {
      employeeId: employee.id,
      currentRole: employee.role,
      targetRole,
      pathSteps,
      successProbability: this.calculateSuccessProbability(employee, targetRole),
      timeToTarget: "2-3 years",
      skillGaps: this.identifyCareerSkillGaps(employee, targetRole),
    }
  }

  // Calculate success probability for career path
  static calculateSuccessProbability(employee: any, targetRole: string): number {
    const performanceScore = employee.performanceRating || 75
    const learningVelocity = employee.learningVelocity || 70
    const relevantExperience = employee.experience?.length || 0

    return Math.min(95, Math.round((performanceScore + learningVelocity + relevantExperience * 5) / 3))
  }

  // Identify skill gaps for career progression
  static identifyCareerSkillGaps(employee: any, targetRole: string): SkillMatch[] {
    // Mock skill gaps based on target role
    const targetSkills = targetRole.includes("Manager")
      ? ["Leadership", "Strategic Planning", "Team Management", "Budget Management"]
      : ["Advanced Technical", "Architecture", "Mentoring", "Innovation"]

    return this.calculateSkillMatches(employee.skills || [], targetSkills)
  }

  // Predict attrition risk
  static predictAttritionRisk(employee: any): AttritionRiskPrediction {
    const factors = [
      {
        factor: "Job Satisfaction",
        impact: employee.satisfactionScore < 70 ? 30 : 0,
        description: "Below average satisfaction scores",
      },
      {
        factor: "Career Growth",
        impact: employee.lastPromotion ? 0 : 25,
        description: "No recent promotions or career advancement",
      },
      {
        factor: "Workload",
        impact: employee.utilization > 90 ? 20 : 0,
        description: "Consistently high workload and stress",
      },
      {
        factor: "Skill Development",
        impact: employee.skillsGrowth < 10 ? 15 : 0,
        description: "Limited opportunities for skill growth",
      },
    ]

    const totalRisk = factors.reduce((sum, f) => sum + f.impact, 0)
    const riskLevel = totalRisk > 50 ? "high" : totalRisk > 25 ? "medium" : "low"

    return {
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department,
      riskScore: totalRisk,
      riskLevel,
      keyFactors: factors.filter((f) => f.impact > 0),
      interventions: this.generateInterventions(factors),
      timeframe: riskLevel === "high" ? "3-6 months" : riskLevel === "medium" ? "6-12 months" : "12+ months",
    }
  }

  // Generate intervention recommendations
  static generateInterventions(factors: any[]) {
    const interventions = []

    if (factors.some((f) => f.factor === "Job Satisfaction" && f.impact > 0)) {
      interventions.push({
        type: "Career Discussion",
        description: "Schedule one-on-one career development conversation",
        expectedImpact: 15,
      })
    }

    if (factors.some((f) => f.factor === "Career Growth" && f.impact > 0)) {
      interventions.push({
        type: "Growth Opportunity",
        description: "Identify stretch assignments or promotion opportunities",
        expectedImpact: 20,
      })
    }

    if (factors.some((f) => f.factor === "Workload" && f.impact > 0)) {
      interventions.push({
        type: "Workload Rebalancing",
        description: "Review and redistribute current responsibilities",
        expectedImpact: 18,
      })
    }

    return interventions
  }
}
