"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockLearningPaths, mockSkills } from "@/lib/mock-data"
import { BookOpen, TrendingUp, Target, Play, CheckCircle } from "lucide-react"

export function UpskillingPlanner() {
  const inDemandSkills = mockSkills.filter((skill) => skill.inDemand).slice(0, 6)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-accent" />
          Upskilling Planner
        </CardTitle>
        <CardDescription>AI-curated learning paths for your career growth</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="paths" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="skills">Skill Gaps</TabsTrigger>
          </TabsList>

          <TabsContent value="paths" className="space-y-4">
            {mockLearningPaths.map((path) => (
              <div key={path.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{path.title}</h4>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                  </div>
                  <Badge variant="outline">{path.difficulty}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} />
                </div>

                <div className="flex flex-wrap gap-1">
                  {path.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {path.estimatedDuration} • {path.modules.length} modules
                  </div>
                  <Button size="sm" variant="outline">
                    <Play className="h-3 w-3 mr-1" />
                    Continue Learning
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Recent Modules:</p>
                  {path.modules.slice(0, 2).map((module) => (
                    <div key={module.id} className="flex items-center gap-2 text-sm">
                      {module.completed ? (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      ) : (
                        <div className="h-3 w-3 rounded-full border-2 border-muted-foreground" />
                      )}
                      <span className={module.completed ? "line-through text-muted-foreground" : ""}>
                        {module.title}
                      </span>
                      <span className="text-muted-foreground">({module.duration})</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {inDemandSkills.map((skill) => (
                <div key={skill.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{skill.name}</h4>
                      <p className="text-sm text-muted-foreground">{skill.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-accent">{skill.marketValue}</div>
                      <p className="text-xs text-muted-foreground">market value</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant={skill.level === "beginner" ? "destructive" : "secondary"}>{skill.level}</Badge>
                    {skill.inDemand && (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        High Demand
                      </div>
                    )}
                  </div>

                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    <Target className="h-3 w-3 mr-1" />
                    Start Learning
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
