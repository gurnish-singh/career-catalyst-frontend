"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockTeamMembers, mockTalentMatches } from "@/lib/manager-mock-data"
import { Search, Zap, AlertTriangle, CheckCircle } from "lucide-react"

export function TalentDiscovery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "busy":
        return "bg-red-100 text-red-800"
      case "unavailable":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <CheckCircle className="h-4 w-4" />
      case "medium":
        return <AlertTriangle className="h-4 w-4" />
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-accent" />
          Talent Discovery
        </CardTitle>
        <CardDescription>Find the right talent for your projects with AI-powered matching</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search Talent</TabsTrigger>
            <TabsTrigger value="matches">AI Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search by skills, role, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {mockTeamMembers.map((member) => (
                <div key={member.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{member.name}</h4>
                        <Badge className={getAvailabilityColor(member.availability)}>{member.availability}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {member.role} • {member.department}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Utilization</p>
                      <div className="flex items-center gap-2">
                        <Progress value={member.utilization} className="flex-1" />
                        <span className="font-medium">{member.utilization}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Performance</p>
                      <p className="font-medium">{member.performanceScore}/100</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Risk Level</p>
                      <div className={`flex items-center gap-1 font-medium ${getRiskColor(member.riskLevel)}`}>
                        {getRiskIcon(member.riskLevel)}
                        {member.riskLevel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">{member.currentProjects.length} active projects</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button size="sm" className="bg-accent hover:bg-accent/90">
                        Assign to Project
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            <div className="p-4 bg-accent/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-accent" />
                <h4 className="font-medium">AI-Powered Recommendations</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Based on project requirements: "Senior Full Stack Developer for AI Platform"
              </p>
            </div>

            <div className="space-y-4">
              {mockTalentMatches.map((match, index) => (
                <div key={match.employee.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={match.employee.avatar || "/placeholder.svg"} alt={match.employee.name} />
                      <AvatarFallback>
                        {match.employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{match.employee.name}</h4>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-accent">{match.matchPercentage}%</div>
                          <p className="text-xs text-muted-foreground">match</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {match.employee.role} • {match.employee.department}
                      </p>
                      <p className="text-sm">{match.recommendationReason}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">Matching Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {match.matchingSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs bg-green-100 text-green-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-600 mb-1">Skills to Develop</p>
                      <div className="flex flex-wrap gap-1">
                        {match.missingSkills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {match.availabilityScore}% available • Performance: {match.employee.performanceScore}/100
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-accent hover:bg-accent/90">
                        Assign & Notify
                      </Button>
                    </div>
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
