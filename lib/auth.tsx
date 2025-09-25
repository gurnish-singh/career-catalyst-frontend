"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User, AuthState, UserRole } from "@/types/user"

const AuthContext = createContext<
  AuthState & {
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    switchRole: (role: UserRole) => void
  }
>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  switchRole: () => {},
})

// Mock users for demo purposes
const mockUsers: Record<string, User & { password: string }> = {
  "employee@company.com": {
    id: "1",
    email: "employee@company.com",
    password: "password",
    name: "Sarah Johnson",
    role: "employee",
    department: "Engineering",
    skills: ["React", "TypeScript", "Node.js", "Python"],
    avatar: "/professional-woman-diverse.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "manager@company.com": {
    id: "2",
    email: "manager@company.com",
    password: "password",
    name: "Michael Chen",
    role: "manager",
    department: "Engineering",
    skills: ["Leadership", "Project Management", "React", "System Design"],
    avatar: "/professional-man.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  "leadership@company.com": {
    id: "3",
    email: "leadership@company.com",
    password: "password",
    name: "Emily Rodriguez",
    role: "leadership",
    department: "Executive",
    skills: ["Strategic Planning", "Business Development", "Team Building"],
    avatar: "/executive-woman.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const mockUser = mockUsers[email]
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
