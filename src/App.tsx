import { Navigate, Route, Routes } from 'react-router-dom'
import PWABadge from './PWABadge.tsx'
import QrPage from './pages/qr/qr.tsx'
import LoginPage from './pages/login/login.tsx'
import { PrivateRoute } from './utils/private-route.tsx'
import { PublicRoute } from './utils/public-route.tsx'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <QrPage />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />

      </Routes>
      <PWABadge />
    </>
  )
}

export default App
