export type UserRole = "employee" | "manager" | "leadership"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  department?: string
  skills?: string[]
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}
