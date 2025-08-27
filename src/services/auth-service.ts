import axios from "axios"
import { ILoginDto, ILoginResponse } from "../types/auth-types"
import api from "../const/api"

class AuthService {
  async login(data: ILoginDto) {
    try {
      const res = await api.post<ILoginResponse>("/auth/login", data)
      const token = res.data.accessToken
      const role = res.data.role
      localStorage.setItem("jwt", token)
      localStorage.setItem("role", role)
      return res.data
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || err.message || "Login failed"
        console.error("Login error:", msg)
        throw new Error(msg)
      } else {
        console.error("Unexpected error:", err)
        throw err
      }
    }
  }
  async logout(){
    try {
      await api.post<ILoginResponse>("/auth/logout")
      localStorage.clear()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || err.message || "Login failed"
        console.error("Login error:", msg)
        throw new Error(msg)
      } else {
        console.error("Unexpected error:", err)
        throw err
      }
    }
  }

  async isAuth(): Promise<boolean> {
    try {
      const res = await api.get("/auth/isauth")
      return res.status === 200
    } catch {
      localStorage.removeItem("jwt")
      throw new Error("Вы не авторизованы")
    }
  }
  async isAdmin(): Promise<boolean> {
    try {
      const res = await api.get("/auth/isadmin")
      return res.status === 200
    } catch {
      localStorage.removeItem("role")
      throw new Error("Вы не админ")
    }
  }
}

export default new AuthService()
