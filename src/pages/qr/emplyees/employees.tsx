import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../ui/button/button";
import { useEffect, useState } from "react";
import userService from "../../../services/user-service";
import { IUser } from "../../../types/user-types";
import styles from "./employees.module.scss";

export default function Employees() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<IUser[]>([])
  const role = searchParams.get('role') || 'user'
  useEffect(()=>{
    const getUsersFn = async () => {
      try{
        const res = await userService.getUserList({role: role as 'admin'|'user'});
        setUsers(res)
      }
      catch(e){
        console.log(e);
      }
    }
    getUsersFn()
  },[role])

  return (
    <div className='wrapper'>
      <h1>Список сотрудников</h1>

      <div className={styles.employeesList}>
        <div>
          <label>Role: </label>
          <select value={role} onChange={(e)=>{
            const value = e.target.value
            setSearchParams((prev)=>{
              const next = new URLSearchParams(prev)
              if (value) next.set('role', value)
              else next.delete('role')
              return next
            })
          }}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
        
      {users.map((u)=>{
        return <div className={styles.employeeCard}>
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
    </div>
  );
}
