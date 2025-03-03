import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const response = await fetch("http://localhost:8080/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          const userData = await response.json()
          if (response.ok) setUser(userData)
        } catch (err) {
          console.error("Session check failed:", err)
          localStorage.removeItem("token")
        }
      }
    }
    checkAuth()
  }, [])

  const signup = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      localStorage.setItem("token", data.token)
      setUser(data.user)
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      localStorage.setItem("token", data.token)
      setUser(data.user)
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    error,
    loading,
    signup,
    login,
    logout: () => {
      localStorage.removeItem("token")
      setUser(null)
      navigate("/login")
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}