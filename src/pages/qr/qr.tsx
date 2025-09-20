import { Link, useNavigate } from "react-router-dom";
import styles from './qr.module.scss'
import Button from "../../ui/button/button";
import authService from "../../services/auth-service";
import { toast } from "react-toastify";
export default function QrPage() {
  const role = localStorage.getItem("role")
  const navigate = useNavigate()
  async function logoutFn() {
    try {
      await authService.logout()
      navigate("/login")
    }
    catch (e) {
      toast.error((e as { message: string }).message, { toastId: 'logout-error' })
    }
  }
  return (
    <div className={`${styles.QrPage} wrapper`}>
      {role === 'admin' ?
        <div>
          <div className={`${styles.btn} ${styles.generate}`}><Link to={'/generate'}>Открыть QR</Link></div>
          <div className={`${styles.btn} ${styles.journal}`}><Link to={'/journal'}>Журнал</Link></div>
          <div className={`${styles.btn} ${styles.profile}`}><Link to={'/employees'}>Сотрудники</Link></div>
        </div>
        :
        <div>
          <div className={`${styles.btn} ${styles.scan}`}><Link to={'/scan/first'}>Сканировать QR</Link></div>
          <div className={`${styles.btn} ${styles.profile}`}><Link to={'/profile'}>Профиль</Link></div>
        </div>
      }
      <Button onClick={logoutFn} variant="danger">Выйти</Button>

    </div>
  )
}