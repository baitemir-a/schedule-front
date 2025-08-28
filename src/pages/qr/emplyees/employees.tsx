import { useNavigate } from "react-router-dom";
import Button from "../../../ui/button/button";
import { useEffect, useState } from "react";
import userService from "../../../services/user-service";
import { IUser } from "../../../types/user-types";
import styles from "./employees.module.scss";

export default function Employees() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([])
  useEffect(()=>{
    const getUsersFn = async () => {
      try{
        const res = await userService.getUserList();
        setUsers(res)
      }
      catch(e){
        console.log(e);
      }
    }
    getUsersFn()
  },[])

  return (
    <div className='wrapper'>
      <h1>Список сотрудников</h1>
      {users.map((u)=>{
        return <div>
          <p>{u.uuid}</p>
          <p>{u.email}</p>
          <p>{u.password}</p>
          <p>{u.name}</p>
          <p>{u.role}</p>
          <img src={`${import.meta.env.VITE_API_URL}${u.avatar}`}/>
        </div>
      })}
      <Button onClick={()=>navigate('/')} variant="secondary">Назад</Button>
    </div>
  );
}
