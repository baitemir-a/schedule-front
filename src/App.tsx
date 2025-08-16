import { Route, Routes } from "react-router-dom"
import { QrPage } from "./pages/qr/qr"
import LoginPage from "./pages/login/login"
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<QrPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
