import { Navigate, Route, Routes } from 'react-router-dom'
import PWABadge from './PWABadge.tsx'
import LoginPage from './pages/login/login.tsx'
import { PrivateRoute } from './utils/private-route.tsx'
import { PublicRoute } from './utils/public-route.tsx'
import { routes } from './const/routes.tsx'


function App() {

  return (
    <>
      <Routes>
        {routes.map((r) => {
          return (
            <Route path={r.link} element={
              <PrivateRoute>
                {r.component}
              </PrivateRoute>
            } />
          )
        })}
        
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
