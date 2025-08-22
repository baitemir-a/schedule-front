import axios from "axios"
import { ILoginDto, ILoginResponse } from "../types/auth-types"
import api from "../const/api"

class AuthService {
  async login(data: ILoginDto) {
    try {
      const res = await api.post<ILoginResponse>("/auth/login", data)
      const token = res.data.accessToken
      localStorage.setItem("jwt", token)
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

  async isAuth(): Promise<boolean> {
    try {
      const res = await api.get("/auth/isauth")
      return res.status === 200
    } catch {
      throw new Error("Вы не авторизованы")
    }
  }
}

export default new AuthService()
