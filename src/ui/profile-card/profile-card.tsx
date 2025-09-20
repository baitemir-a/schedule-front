import styles from './profile-card.module.scss'
import avatarDefault from '../../assets/avatar-default.png'
import { useNavigate } from 'react-router-dom';
import userService from '../../services/user-service';
import { toast } from 'react-toastify';
type Props = {
  uuid: string
  name: string
  email: string
  role: string
  avatar: string|null
  onDelete: () => void
}

export const ProfileCard = ({ uuid, name, email, role, avatar, onDelete }: Props) => {
  const navigate = useNavigate();
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/user/update/${uuid}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Add delete confirmation and API call
    userService.deleteUser(uuid).then(() => {
      toast.success("Пользователь удален успешно");
      onDelete();
    });
  };

  return (
    <div onClick={() => navigate(`/profile/${uuid}`)} className={styles.profileCard}>
      <div className={styles.deleteIcon} onClick={handleDeleteClick}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
        </svg>
      </div>
      <div className={styles.editIcon} onClick={handleEditClick}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
        </svg>
      </div>
      <img src={avatar?`${import.meta.env.VITE_API_URL}${avatar}` : avatarDefault} alt="avatar" className={styles.avatar} />
      <p className={styles.email}>{email}</p>
      <p className={styles.uuid}>{uuid}</p>
      <p className={styles.name}>{name}</p>
      <p className={styles.role + ' ' + styles[role]}>{role}</p>
    </div>
  )
}