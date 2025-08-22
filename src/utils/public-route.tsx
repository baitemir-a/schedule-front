import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import authService from "../services/auth-service"

interface Props {
  children: React.ReactNode
}

export const PublicRoute: React.FC<Props> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authService.isAuth()
        setIsAuth(res)
      } catch {
        setIsAuth(false)
      }
    }
    checkAuth()
  }, [])
  return isAuth ? <Navigate to="/" replace /> : <>{children}</>
}
