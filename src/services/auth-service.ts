import axios from "axios"
import { ILoginDto, ILoginResponse } from "../types/auth-types"

class AuthService {
    async login({ email, password }: ILoginDto) {

        try {
            const res = await axios.post<ILoginResponse>('http://localhost:5000/auth/login', { email, password })
            console.log(res.headers.getSetCookie);
            console.log(res);

            const token = res.data.accessToken
            localStorage.setItem("jwt", token)
        }
        catch (err) {
            if (axios.isAxiosError(err)) {
                const msg = err.response?.data?.message || err.message || "Login failed";
                console.error("Login error:", msg);
                throw new Error(msg);
            } else {
                console.error("Unexpected error:", err);
                throw err;
            }
        }
    }
     async isAuth():Promise<boolean> {

        try {
            const token = localStorage.getItem('jwt')
            const res = await axios.get('http://localhost:5000/auth/isauth', {headers:{Authorization:`Bearer ${token}`}})
            return !!res
        }
        catch (err) {
            throw new Error('Вы не зарегестрирваны')
        }
    }
}
export default new AuthService()