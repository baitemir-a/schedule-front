import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import authService from "../services/auth-service"

interface Props {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<Props> = ({ children }) => {
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

  if (isAuth === null) {
    return <div>Loading...</div>
  }

  return isAuth ? <>{children}</> : <Navigate to="/login" replace />
}
