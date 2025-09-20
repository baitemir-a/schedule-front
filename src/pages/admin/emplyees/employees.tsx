import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../ui/button/button";
import { useEffect, useState } from "react";
import userService from "../../../services/user-service";
import { IUser } from "../../../types/user-types";
import styles from "./employees.module.scss";
import { ProfileCard } from "../../../ui/profile-card/profile-card";

export default function Employees() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<IUser[]>([])
  const role = searchParams.get('role') || 'user'
  useEffect(() => {
    const getUsersFn = async () => {
      try {
        const res = await userService.getUserList({ role: role as 'admin' | 'user' });
        setUsers(res)
      }
      catch (e) {
        console.log(e);
      }
    }
    getUsersFn()
  }, [role])

  return (
    <div className={`${styles.container} wrapper`}>
      <h1>Список сотрудников</h1>
      <div className={styles.roleFilter}>
          <label>Role:</label>
          <select value={role} onChange={(e) => {
            const value = e.target.value
            setSearchParams((prev) => {
              const next = new URLSearchParams(prev)
              if (value) next.set('role', value)
              else next.delete('role')
              return next
            })
          }}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <Button onClick={() => navigate('/user/create')} full={false} variant="main">Новый сотрудник</Button>
        </div>
      <div className={styles.employeesListControls}>
        

        <div className={styles.employeesList}>
        {users.map((u) => {
          return (
            <ProfileCard uuid={u.uuid} name={u.name} email={u.email} role={u.role} avatar={u.avatar} key={u.uuid} onDelete={() => {
              setUsers(users.filter((user) => user.uuid !== u.uuid))
            }} />
          )
        })}
        </div>
      </div>
      <Button onClick={() => navigate('/')} variant="secondary">Назад</Button>
    </div>
  );
}
