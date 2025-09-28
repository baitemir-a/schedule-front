import { toast } from "react-toastify"
import api from "../const/api"
import { IUserListFilter } from "../types/user-types"

class UserService{
  async getUserList(filter: IUserListFilter = {}){
    try{
      const params = new URLSearchParams()
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value))
        }
      })
      const query = params.toString()
      const res = await api.get(`/users${query ? `?${query}` : ""}`)
      return res.data
    }
    catch(e){
      const error = e as {message:string}
      toast.error(error.message)
    }
  }
  async getUser(id: string){
    try{
      const res = await api.get(`/users/${id}`)
      return res.data
    }
    catch(e){
      const error = e as {message:string}
      toast.error(error.message)
    }
  }
}

export default new UserService()