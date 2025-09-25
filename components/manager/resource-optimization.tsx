"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockTeamMembers, mockProjectStaffing } from "@/lib/manager-mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, Calendar, DollarSign } from "lucide-react"

const utilizationData = mockTeamMembers.map((member) => ({
  name: member.name.split(" ")[0],
  utilization: member.utilization,
  target: 85,
}))

export function ResourceOptimization() {
  const averageUtilization = Math.round(
    mockTeamMembers.reduce((sum, member) => sum + member.utilization, 0) / mockTeamMembers.length,
  )

  const underutilized = mockTeamMembers.filter((member) => member.utilization < 70)
  const overutilized = mockTeamMembers.filter((member) => member.utilization > 90)

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-blue-100 text-blue-800"
      case "staffing":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Resource Optimization
          </CardTitle>
          <CardDescription>Monitor and optimize team utilization across projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-4">Team Utilization Overview</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="utilization" fill="hsl(var(--accent))" />
                  <Bar dataKey="target" fill="hsl(var(--muted))" opacity={0.3} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Average Utilization</h4>
                  <div className="text-2xl font-bold text-accent">{averageUtilization}%</div>
                </div>
                <Progress value={averageUtilization} />
                <p className="text-sm text-muted-foreground mt-2">Target: 85% utilization</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <div className="text-lg font-bold text-red-600">{underutilized.length}</div>
                  <p className="text-sm text-muted-foreground">Underutilized</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="text-lg font-bold text-orange-600">{overutilized.length}</div>
                  <p className="text-sm text-muted-foreground">Overutilized</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Utilization Alerts
            </CardTitle>
            <CardDescription>Team members requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {underutilized.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.utilization}% utilized</p>
                </div>
                <Badge variant="destructive">Underutilized</Badge>
              </div>
            ))}

            {overutilized.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.utilization}% utilized</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800">Overutilized</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Project Staffing
            </CardTitle>
            <CardDescription>Current project staffing status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockProjectStaffing.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{project.projectName}</h4>
                    <div className="flex gap-2">
                      <Badge className={getProjectStatusColor(project.status)}>{project.status}</Badge>
                      <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {project.currentHeadcount}/{project.requiredHeadcount}
                    </div>
                    <p className="text-xs text-muted-foreground">staffed</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Staffing Progress</span>
                    <span>{Math.round((project.currentHeadcount / project.requiredHeadcount) * 100)}%</span>
                  </div>
                  <Progress value={(project.currentHeadcount / project.requiredHeadcount) * 100} />
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.requiredSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />${(project.budget / 1000).toFixed(0)}K budget
                  </div>
                  <Button size="sm" variant="outline">
                    Find Talent
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
