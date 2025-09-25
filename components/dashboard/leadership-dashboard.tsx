"use client"

import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "./dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkillsHeatmap } from "@/components/leadership/skills-heatmap"
import { AttritionAnalysis } from "@/components/leadership/attrition-analysis"
import { StrategicInsights } from "@/components/leadership/strategic-insights"
import { WorkforceProjections } from "@/components/leadership/workforce-projections"
import { TrendingUp, Users, DollarSign, Target, Brain, AlertTriangle, BarChart3 } from "lucide-react"

export function LeadershipDashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Leadership Dashboard</h1>
          <p className="text-muted-foreground">Strategic workforce insights and organizational health</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Utilization</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91%</div>
              <p className="text-xs text-muted-foreground">+5% from last quarter</p>
              <Progress value={91} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs text-muted-foreground">Saved through internal mobility</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">+8% improvement YoY</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skills Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+23%</div>
              <p className="text-xs text-muted-foreground">New skills acquired this quarter</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Strategic Insights
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Skills Analysis
            </TabsTrigger>
            <TabsTrigger value="attrition" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Attrition Risk
            </TabsTrigger>
            <TabsTrigger value="projections" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Workforce Projections
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <StrategicInsights />
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <SkillsHeatmap />
          </TabsContent>

          <TabsContent value="attrition" className="space-y-6">
            <AttritionAnalysis />
          </TabsContent>

          <TabsContent value="projections" className="space-y-6">
            <WorkforceProjections />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
