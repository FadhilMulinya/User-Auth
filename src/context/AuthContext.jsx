"use client"

import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")

  // Mock login function
  const login = (email, password) => {
    // In a real app, you would validate credentials against a backend
    if (email && password) {
      setUser({ email })
      setError("")
      return true
    } else {
      setError("Invalid credentials")
      return false
    }
  }

  // Mock signup function
  const signup = (email, password) => {
    // In a real app, you would send this data to your backend
    if (email && password) {
      setUser({ email })
      setError("")
      return true
    } else {
      setError("Invalid information")
      return false
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, error, login, signup, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

