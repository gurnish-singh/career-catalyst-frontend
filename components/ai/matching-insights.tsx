"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, Target, TrendingUp, AlertTriangle } from "lucide-react"

interface MatchingInsightsProps {
  type: "talent" | "career" | "attrition"
  data?: any
}

export function MatchingInsights({ type, data }: MatchingInsightsProps) {
  if (type === "talent") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI Talent Matching
          </CardTitle>
          <CardDescription>Intelligent recommendations based on skills, availability, and cultural fit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Match Accuracy</span>
            <span className="text-sm text-muted-foreground">94%</span>
          </div>
          <Progress value={94} />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium">Skills Match</div>
              <div className="text-muted-foreground">87% average</div>
            </div>
            <div>
              <div className="font-medium">Availability</div>
              <div className="text-muted-foreground">76% average</div>
            </div>
          </div>

          <div className="pt-2">
            <Button size="sm" className="w-full">
              <Brain className="h-4 w-4 mr-2" />
              View AI Recommendations
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (type === "career") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Career Path AI
          </CardTitle>
          <CardDescription>Personalized career progression recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Success Probability</span>
              <Badge variant="secondary">89%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Time to Target</span>
              <span className="text-sm text-muted-foreground">18-24 months</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Key Skill Gaps</div>
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                Leadership
              </Badge>
              <Badge variant="outline" className="text-xs">
                Strategy
              </Badge>
              <Badge variant="outline" className="text-xs">
                Budget Mgmt
              </Badge>
            </div>
          </div>

          <Button size="sm" className="w-full">
            View Full Career Plan
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (type === "attrition") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Attrition Risk AI
          </CardTitle>
          <CardDescription>Predictive analytics for employee retention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Risk Level</span>
            <Badge variant="destructive">Medium</Badge>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Key Risk Factors</div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>• Limited career growth opportunities</div>
              <div>• High workload stress indicators</div>
              <div>• Below average satisfaction scores</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Recommended Actions</div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>• Schedule career development discussion</div>
              <div>• Review workload distribution</div>
              <div>• Identify growth opportunities</div>
            </div>
          </div>

          <Button size="sm" className="w-full">
            View Intervention Plan
          </Button>
        </CardContent>
      </Card>
    )
  }

  return null
}
