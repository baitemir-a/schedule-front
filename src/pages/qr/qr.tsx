import { Link } from "react-router-dom";
import styles from './qr.module.scss'
export default function QrPage() {
  const role = localStorage.getItem("role")
  return (
    <div className={styles.QrPage}>
      {role === 'admin' ?
        <div className={`${styles.btn} ${styles.generate}`}><Link to={'/generate'}>Открыть QR</Link></div>
        :
        <div className={`${styles.btn} ${styles.scan}`}><Link to={'/scan'}>Сканировать QR</Link></div>
      }
      {role === 'admin' ?

        <div className={`${styles.btn} ${styles.journal}`}><Link to={'/journal'}>Журнал</Link></div>
        :

        <div className={`${styles.btn} ${styles.profile}`}><Link to={'/profile'}>Профиль</Link></div>
      }
    </div>
  )
}