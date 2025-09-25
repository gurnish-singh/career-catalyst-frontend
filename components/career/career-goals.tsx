"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { mockCareerGoals } from "@/lib/mock-data"
import { Target, Calendar, CheckCircle, Clock } from "lucide-react"

export function CareerGoals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-accent" />
          Career Goals
        </CardTitle>
        <CardDescription>Track your progress toward career milestones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockCareerGoals.map((goal) => (
          <div key={goal.id} className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">{goal.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {goal.targetRole} • {goal.timeline}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-accent">{goal.progress}%</div>
                <p className="text-xs text-muted-foreground">complete</p>
              </div>
            </div>

            <Progress value={goal.progress} />

            <div className="flex flex-wrap gap-1">
              {goal.requiredSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Milestones:</p>
              {goal.milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  {milestone.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${milestone.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {milestone.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{milestone.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {milestone.dueDate.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              Update Goal
            </Button>
          </div>
        ))}

        <Button className="w-full bg-accent hover:bg-accent/90">
          <Target className="h-4 w-4 mr-2" />
          Set New Career Goal
        </Button>
      </CardContent>
    </Card>
  )
}
