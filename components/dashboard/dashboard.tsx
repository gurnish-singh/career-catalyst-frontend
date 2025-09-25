"use client"

import { useAuth } from "@/lib/auth"
import { EmployeeDashboard } from "./employee-dashboard"
import { ManagerDashboard } from "./manager-dashboard"
import { LeadershipDashboard } from "./leadership-dashboard"

export function Dashboard() {
  const { user } = useAuth()

  if (!user) return null

  switch (user.role) {
    case "employee":
      return <EmployeeDashboard />
    case "manager":
      return <ManagerDashboard />
    case "leadership":
      return <LeadershipDashboard />
    default:
      return <EmployeeDashboard />
  }
}
