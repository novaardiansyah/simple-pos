"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { User } from "@/types"
import { AuthService } from "@/services"

type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  login: (token: string) => void
  logout: () => void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("auth_user")
      if (storedUser) {
        try {
          return JSON.parse(storedUser) as User
        } catch {
          return null
        }
      }
    }
    return null
  })

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("auth_token")
    }
    return false
  })
  const router = useRouter()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(false)
  }, [])


  const login = async (token: string) => {
    setIsLoading(true)
    localStorage.setItem("auth_token", token)
    setIsAuthenticated(true)

    const userData = await AuthService.getMe(token)
    if (userData) {
      localStorage.setItem("auth_user", JSON.stringify(userData))
      setUser(userData)
    }

    router.push("/")
    setIsLoading(false)
  }

  const logout = () => {
    setIsLoading(true)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    setIsAuthenticated(false)
    setUser(null)
    router.push("/login")
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
