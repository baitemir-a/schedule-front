import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import authService from "../services/auth-service"
import { toast } from "react-toastify"

interface Props {
  adminOnly?: boolean
  children: React.ReactNode
}

export const PrivateRoute: React.FC<Props> = ({ children, adminOnly = false }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = await authService.isAuth()
        setIsAuth(auth)

        if (adminOnly) {
          const admin = await authService.isAdmin()
          setIsAdmin(admin)
        } else if (adminOnly) {
          setIsAdmin(false) // <- important
        }
      } catch {
        setIsAuth(false)
        if (adminOnly) setIsAdmin(false)
      }

    }
    checkAuth()
  }, [adminOnly])

  if (isAuth === null || (adminOnly && isAdmin === null)) {
    return <div>Loading...</div>
  }

  if (adminOnly) {
    if (isAdmin && isAuth) {
      return <>{children}</>
    }
    else {
      return <NoAccess />
    }
  }

  return isAuth ? <>{children}</> : <Navigate to="/login" replace />
}


const NoAccess = () => {
  useEffect(() => {
    toast.error("У вас нет прав", { toastId: "no acceess error" })
  }, [])
  return <Navigate to="/" replace />
}
