"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"

type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  const login = (token: string) => {
    localStorage.setItem("auth_token", token)
    setIsAuthenticated(true)
    router.push("/")
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
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
