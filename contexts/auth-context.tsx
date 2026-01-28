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
  const [isLoading, setIsLoading] = useState(true)

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("auth_token")
    }
    return false
  })
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    const isAuth = !!token
    if (isAuth !== isAuthenticated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(isAuth)
    }
    setIsLoading(false)
  }, [isAuthenticated])


  const login = (token: string) => {
    setIsLoading(true)
    localStorage.setItem("auth_token", token)
    setIsAuthenticated(true)
    router.push("/")
    setIsLoading(false)
  }

  const logout = () => {
    setIsLoading(true)
    localStorage.removeItem("auth_token")
    setIsAuthenticated(false)
    router.push("/login")
    setIsLoading(false)
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
