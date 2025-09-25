"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockStrategicInsights } from "@/lib/leadership-mock-data"
import { Lightbulb, TrendingUp, AlertTriangle, Target, DollarSign } from "lucide-react"

export function StrategicInsights() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return <Target className="h-4 w-4" />
      case "risk":
        return <AlertTriangle className="h-4 w-4" />
      case "trend":
        return <TrendingUp className="h-4 w-4" />
      case "recommendation":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "bg-green-100 text-green-800"
      case "risk":
        return "bg-red-100 text-red-800"
      case "trend":
        return "bg-blue-100 text-blue-800"
      case "recommendation":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const criticalInsights = mockStrategicInsights.filter((insight) => insight.priority === "critical")
  const highROIInsights = mockStrategicInsights.filter((insight) => insight.roi >= 200)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-accent" />
          Strategic Insights
        </CardTitle>
        <CardDescription>AI-powered recommendations for organizational growth</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Critical Insights Alert */}
        {criticalInsights.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <h4 className="font-medium text-red-800">Critical Strategic Issues</h4>
            </div>
            <p className="text-sm text-red-700">
              {criticalInsights.length} critical issue{criticalInsights.length > 1 ? "s" : ""} requiring immediate
              executive attention.
            </p>
          </div>
        )}

        {/* High ROI Opportunities */}
        {highROIInsights.length > 0 && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <h4 className="font-medium text-green-800">High ROI Opportunities</h4>
            </div>
            <p className="text-sm text-green-700">
              {highROIInsights.length} high-impact opportunity{highROIInsights.length > 1 ? "ies" : "y"} with 200%+ ROI
              potential.
            </p>
          </div>
        )}

        {/* Insights List */}
        <div className="space-y-4">
          {mockStrategicInsights.map((insight) => (
            <div key={insight.id} className={`p-4 border rounded-lg ${getPriorityColor(insight.priority)}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge className={`${getTypeColor(insight.type)} flex items-center gap-1`}>
                    {getTypeIcon(insight.type)}
                    {insight.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {insight.priority} priority
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{insight.roi}%</div>
                  <p className="text-xs text-muted-foreground">ROI</p>
                </div>
              </div>

              <h4 className="font-medium mb-2">{insight.title}</h4>
              <p className="text-sm mb-3">{insight.description}</p>

              <div className="p-3 bg-white/50 rounded-md mb-3">
                <p className="text-sm font-medium mb-1">Business Impact:</p>
                <p className="text-sm">{insight.impact}</p>
              </div>

              <div className="space-y-2 mb-3">
                <p className="text-sm font-medium">Suggested Actions:</p>
                <ul className="text-sm space-y-1">
                  {insight.suggestedActions.map((action, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-1 w-1 bg-current rounded-full" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">Timeline: {insight.timeline}</span>
                  <div className="flex gap-1">
                    {insight.affectedDepartments.slice(0, 3).map((dept) => (
                      <Badge key={dept} variant="secondary" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                    {insight.affectedDepartments.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{insight.affectedDepartments.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    Create Initiative
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button className="bg-accent hover:bg-accent/90">Generate Strategic Plan</Button>
        </div>
      </CardContent>
    </Card>
  )
}
