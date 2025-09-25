"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockProjects, mockApplications } from "@/lib/mock-data"
import { Sparkles, Send, Eye, Clock, CheckCircle } from "lucide-react"

export function CareerAgent() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Send className="h-4 w-4" />
      case "under-review":
        return <Eye className="h-4 w-4" />
      case "accepted":
        return <CheckCircle className="h-4 w-4" />
      case "draft":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "under-review":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          Career Agent
        </CardTitle>
        <CardDescription>AI-powered career guidance and opportunity matching</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="opportunities" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="space-y-4">
            <div className="space-y-4">
              {mockProjects.slice(0, 3).map((project) => (
                <div key={project.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.department}</p>
                      <p className="text-sm">{project.description}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-2xl font-bold text-accent">{project.matchPercentage}%</div>
                      <p className="text-xs text-muted-foreground">match</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{project.duration}</span>
                      <Badge variant={project.priority === "high" ? "destructive" : "outline"}>
                        {project.priority}
                      </Badge>
                    </div>
                    <Button size="sm" className="bg-accent hover:bg-accent/90">
                      Apply with AI
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <div className="space-y-4">
              {mockApplications.map((application) => (
                <div key={application.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{application.projectTitle}</h4>
                      {application.submittedAt && (
                        <p className="text-sm text-muted-foreground">
                          Submitted {application.submittedAt.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Badge className={`${getStatusColor(application.status)} flex items-center gap-1`}>
                      {getStatusIcon(application.status)}
                      {application.status.replace("-", " ")}
                    </Badge>
                  </div>

                  {application.aiGenerated && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-3 w-3" />
                      AI-generated application
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {application.status === "draft" && (
                      <Button size="sm" className="bg-accent hover:bg-accent/90">
                        Submit Application
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
