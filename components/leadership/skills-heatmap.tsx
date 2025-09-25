"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockSkillHeatmap } from "@/lib/leadership-mock-data"
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react"

export function SkillsHeatmap() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case "decreasing":
        return <TrendingDown className="h-3 w-3 text-red-600" />
      case "stable":
        return <Minus className="h-3 w-3 text-gray-600" />
      default:
        return <Minus className="h-3 w-3 text-gray-600" />
    }
  }

  const getGapColor = (gap: number) => {
    if (gap <= -60) return "bg-red-500"
    if (gap <= -40) return "bg-orange-500"
    if (gap <= -20) return "bg-yellow-500"
    if (gap <= 0) return "bg-blue-500"
    return "bg-green-500"
  }

  const getGapIntensity = (gap: number) => {
    const intensity = Math.min(Math.abs(gap) / 100, 1)
    return intensity
  }

  const criticalSkills = mockSkillHeatmap.filter((skill) => skill.criticalityScore >= 90)
  const skillsByCategory = mockSkillHeatmap.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof mockSkillHeatmap>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gradient-to-r from-red-500 to-green-500 rounded"></div>
          Skills Heatmap
        </CardTitle>
        <CardDescription>Real-time view of organizational skills supply vs demand</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Critical Skills Alert */}
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <h4 className="font-medium text-red-800">Critical Skills Gaps Detected</h4>
          </div>
          <p className="text-sm text-red-700 mb-3">
            {criticalSkills.length} mission-critical skills have significant gaps that could impact business objectives.
          </p>
          <div className="flex flex-wrap gap-2">
            {criticalSkills.map((skill) => (
              <Badge key={skill.skill} variant="destructive" className="text-xs">
                {skill.skill} ({skill.gap}% gap)
              </Badge>
            ))}
          </div>
        </div>

        {/* Skills Grid by Category */}
        <div className="space-y-6">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category} className="space-y-3">
              <h4 className="font-medium text-lg">{category}</h4>
              <div className="grid gap-3">
                {skills.map((skill) => (
                  <div key={skill.skill} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium">{skill.skill}</h5>
                        {getTrendIcon(skill.trend)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Criticality: {skill.criticalityScore}
                        </Badge>
                        <Badge
                          className={`text-xs ${skill.gap <= -50 ? "bg-red-100 text-red-800" : skill.gap <= -20 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                        >
                          {skill.gap}% gap
                        </Badge>
                      </div>
                    </div>

                    {/* Visual Gap Indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Supply vs Demand</span>
                        <span>
                          {skill.currentSupply} / {skill.internalDemand} needed
                        </span>
                      </div>
                      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`absolute left-0 top-0 h-full ${getGapColor(skill.gap)} transition-all duration-300`}
                          style={{
                            width: `${Math.max((skill.currentSupply / skill.internalDemand) * 100, 5)}%`,
                            opacity: getGapIntensity(skill.gap) * 0.8 + 0.2,
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                          {Math.round((skill.currentSupply / skill.internalDemand) * 100)}%
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Current Supply</p>
                        <p className="font-medium">{skill.currentSupply} people</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Internal Demand</p>
                        <p className="font-medium">{skill.internalDemand} needed</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Market Demand</p>
                        <p className="font-medium">{skill.marketDemand}% high</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button className="bg-accent hover:bg-accent/90">Generate Skills Development Plan</Button>
        </div>
      </CardContent>
    </Card>
  )
}
