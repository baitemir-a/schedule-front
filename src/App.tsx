import { Navigate, Route, Routes } from 'react-router-dom'
import PWABadge from './PWABadge.tsx'
import QrPage from './pages/qr/qr.tsx'
import LoginPage from './pages/login/login.tsx'
// import authService from './services/auth-service.ts'
import { useEffect, useState } from 'react'

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  // async function checkAuth() {
  //   try {
  //     const res = await authService.isAuth()
  //     setIsAuth(res)
  //   }
  //   catch (e) {
  //     const error = e as Error
  //     alert(error.message)
  //   }
  // }
  useEffect(() => {
    const token = localStorage.getItem("jwt")
    setIsAuth(!!token)
  }, [])
  return (
    <>
      <Routes>
        {isAuth ? (
          <>
            <Route index element={<QrPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
      <PWABadge />
    </>
  )
}

export default App
