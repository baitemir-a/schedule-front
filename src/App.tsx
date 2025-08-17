import { Route, Routes } from 'react-router-dom'
import PWABadge from './PWABadge.tsx'
import QrPage from './pages/qr/qr.tsx'
import LoginPage from './pages/login/login.tsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='' index element={<QrPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
      <PWABadge />
    </>
  )
}

export default App
