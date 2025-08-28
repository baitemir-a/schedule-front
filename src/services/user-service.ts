import { toast } from "react-toastify"
import api from "../const/api"

class UserService{
  async getUserList(){
    try{
      const res = await api.get('/users')
      return res.data
    }
    catch(e){
      const error = e as {message:string}
      toast.error(error.message)
    }
  }
}

export default new UserService()