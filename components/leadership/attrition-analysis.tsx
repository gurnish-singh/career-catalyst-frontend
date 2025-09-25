"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockAttritionRisks } from "@/lib/leadership-mock-data"
import { AlertTriangle, TrendingUp, Users, Clock } from "lucide-react"

export function AttritionAnalysis() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-orange-600"
    if (score >= 40) return "text-yellow-600"
    return "text-green-600"
  }

  const highRiskEmployees = mockAttritionRisks.filter((risk) => risk.riskScore >= 70)
  const averageRisk = Math.round(
    mockAttritionRisks.reduce((sum, risk) => sum + risk.riskScore, 0) / mockAttritionRisks.length,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-accent" />
          Attrition Risk Analysis
        </CardTitle>
        <CardDescription>AI-powered prediction of employee retention risks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Average Risk Score</h4>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-accent">{averageRisk}%</div>
            <Progress value={averageRisk} className="mt-2" />
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">High Risk Employees</h4>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-red-600">{highRiskEmployees.length}</div>
            <p className="text-sm text-muted-foreground">Require immediate attention</p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Projected Impact</h4>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-orange-600">$2.1M</div>
            <p className="text-sm text-muted-foreground">Potential replacement cost</p>
          </div>
        </div>

        {/* High Risk Alert */}
        {highRiskEmployees.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <h4 className="font-medium text-red-800">High Attrition Risk Alert</h4>
            </div>
            <p className="text-sm text-red-700">
              {highRiskEmployees.length} employee{highRiskEmployees.length > 1 ? "s" : ""} at high risk of leaving
              within the next 6 months. Immediate intervention recommended.
            </p>
          </div>
        )}

        {/* Risk Details */}
        <div className="space-y-4">
          <h4 className="font-medium">Individual Risk Assessment</h4>
          {mockAttritionRisks.map((risk) => (
            <div key={risk.employeeId} className={`p-4 border rounded-lg ${getImpactColor(risk.impactLevel)}`}>
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg" alt={risk.employeeName} />
                  <AvatarFallback>
                    {risk.employeeName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium">{risk.employeeName}</h5>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getRiskColor(risk.riskScore)}`}>{risk.riskScore}%</div>
                      <p className="text-xs text-muted-foreground">risk score</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {risk.role} • {risk.department}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getImpactColor(risk.impactLevel)}>{risk.impactLevel} impact</Badge>
                    <Badge variant="outline" className="text-xs">
                      {risk.timeframe}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Risk Factors:</p>
                  <div className="flex flex-wrap gap-1">
                    {risk.riskFactors.map((factor, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Suggested Actions:</p>
                  <ul className="text-sm space-y-1">
                    {risk.suggestedActions.map((action, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1 w-1 bg-current rounded-full" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    Schedule 1:1
                  </Button>
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    Create Action Plan
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button className="bg-accent hover:bg-accent/90">Generate Retention Strategy Report</Button>
        </div>
      </CardContent>
    </Card>
  )
}
