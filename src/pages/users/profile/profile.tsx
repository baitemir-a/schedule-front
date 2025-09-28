import { useEffect, useState } from 'react'
import userService from '../../../services/user-service'
import styles from './profile.module.scss'
import { IUser } from '../../../types/user-types'
export const Profile = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const id = useParams().id
  useEffect(() => {
    const getUser = async () => {
      const user = await userService.getUser(uuid)
      setUser(user)
    }
  }, [])
  return <div className={styles.container}>
    <h1>Profile</h1>
  </div>
}