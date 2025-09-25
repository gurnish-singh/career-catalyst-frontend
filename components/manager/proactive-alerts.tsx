"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockResourceAlerts, mockTeamMembers } from "@/lib/manager-mock-data"
import { Bell, AlertTriangle, TrendingDown, TrendingUp, Users, BookOpen, X } from "lucide-react"

export function ProactiveAlerts() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "underutilized":
        return <TrendingDown className="h-4 w-4" />
      case "overutilized":
        return <TrendingUp className="h-4 w-4" />
      case "attrition-risk":
        return <AlertTriangle className="h-4 w-4" />
      case "skill-gap":
        return <BookOpen className="h-4 w-4" />
      case "opportunity":
        return <Users className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getAffectedEmployees = (employeeIds: string[]) => {
    return mockTeamMembers.filter((member) => employeeIds.includes(member.id))
  }

  const unreadAlerts = mockResourceAlerts.filter((alert) => !alert.resolved)
  const criticalAlerts = unreadAlerts.filter((alert) => alert.severity === "critical")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-accent" />
          Proactive Alerts
          {unreadAlerts.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadAlerts.length}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>AI-powered insights and recommendations for your team</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {criticalAlerts.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <h4 className="font-medium text-red-800">Critical Alerts Require Immediate Attention</h4>
            </div>
            <p className="text-sm text-red-700">
              {criticalAlerts.length} critical issue{criticalAlerts.length > 1 ? "s" : ""} detected that could impact
              team performance and retention.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {mockResourceAlerts
            .filter((alert) => !alert.resolved)
            .map((alert) => (
              <div key={alert.id} className={`p-4 border rounded-lg ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(alert.type)}
                    <h4 className="font-medium">{alert.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {alert.severity}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm mb-3">{alert.description}</p>

                {alert.affectedEmployees.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-2">Affected Employees:</p>
                    <div className="flex gap-2">
                      {getAffectedEmployees(alert.affectedEmployees).map((employee) => (
                        <div key={employee.id} className="flex items-center gap-2 p-2 bg-white/50 rounded-md">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                            <AvatarFallback className="text-xs">
                              {employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{employee.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3 bg-white/50 rounded-md mb-3">
                  <p className="text-sm font-medium mb-1">Suggested Action:</p>
                  <p className="text-sm">{alert.suggestedAction}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {alert.createdAt.toLocaleDateString()} • {alert.createdAt.toLocaleTimeString()}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm" className="bg-accent hover:bg-accent/90">
                      Take Action
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {unreadAlerts.length === 0 && (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-medium text-green-800 mb-2">All Clear!</h4>
            <p className="text-sm text-green-600">No active alerts. Your team is performing optimally.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
