import styles from './profile-card.module.scss'
import avatarDefault from '../../assets/avatar-default.png'
type Props = {
  uuid: string
  name: string
  email: string
  role: string
  avatar: string|null
}

export const ProfileCard = ({ uuid, name, email, role, avatar }: Props) => {
  return (
    <div className={styles.profileCard}>
      <img src={avatar?`${import.meta.env.VITE_API_URL}${avatar}` : avatarDefault} alt="avatar" className={styles.avatar} />
      <p className={styles.email}>{email}</p>
      <p className={styles.uuid}>{uuid}</p>
      <p className={styles.name}>{name}</p>
      <p className={styles.role + ' ' + styles[role]}>{role}</p>
    </div>
  )
}