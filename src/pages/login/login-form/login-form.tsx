import { useState } from "react";
import styles from './login-form.module.scss'
import Button from "../../../ui/button/button";
import authService from "../../../services/auth-service";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message: string } | null>(null)

  const navigate = useNavigate()
  async function handleSubmit(e: Event) {
    e.preventDefault()
    setError(null)
    try {
      await authService.login({ email, password })
      navigate("/")
    }
    catch (e) {
      setError(e as { message: string })
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.title}>Login</h1>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={styles.input}
            required
          />
        </div>
        {error ? <p className={styles.error}>{error.message}</p> : null}
        <Button
          variant="main"
          onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  );
}
