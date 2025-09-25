"use client"

import { Card } from "@/components/ui/card"
import { mockWorkforceProjections, mockDepartmentMetrics } from "@/lib/leadership-mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function WorkforceProjections() {
  const projectionData = mockWorkforceProjections.map((projection) => ({
    period: projection.period,
    headcount: projection.totalHeadcount,
    hires: projection.projectedHires,
    attrition: projection.projectedAttrition,
    budget: projection.budgetImpact / 1000000, // Convert to millions
  }))

  const departmentData = mockDepartmentMetrics.map((dept) => ({
    name: dept.name,
    headcount: dept.headcount,
    utilization: dept.utilization,
    budget: dept.budget / 1000000, // Convert to millions
  }))

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Workforce Growth Projections</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="headcount" stroke="#3b82f6" strokeWidth={2} name="Total Headcount" />
            <Line type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={2} name="Projected Hires" />
            <Line type="monotone" dataKey="attrition" stroke="#ef4444" strokeWidth={2} name="Projected Attrition" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Department Headcount Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="headcount"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Budget Allocation by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}M`, "Budget"]} />
              <Bar dataKey="budget" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Workforce Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockWorkforceProjections[0] && (
            <>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{mockWorkforceProjections[0].totalHeadcount}</div>
                <div className="text-sm text-muted-foreground">Current Headcount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{mockWorkforceProjections[0].projectedHires}</div>
                <div className="text-sm text-muted-foreground">Projected Hires (Q1)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{mockWorkforceProjections[0].projectedAttrition}</div>
                <div className="text-sm text-muted-foreground">Projected Attrition (Q1)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  ${(mockWorkforceProjections[0].budgetImpact / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-muted-foreground">Budget Impact (Q1)</div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
