import Button from "../../../ui/button/button";
import styles from "./create-user.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import userService from "../../../services/user-service";
import { toast } from "react-toastify";
export const CreateUser = () => {
  const { uuid, action } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [avatar, setAvatar] = useState<File | null>(null);
  const isAdmin = localStorage.getItem("role") === "admin";

  const navigate = useNavigate();

  const isUpdate = action === "update" && uuid;
  const isCreate = action === "create" && !uuid;


  useEffect(() => {
    if (isUpdate) {
      userService.getUser(uuid).then((user) => {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        setAvatar(user.avatar);
      });
    }
  }, [isUpdate]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isCreate) {
        await userService.createUser({ name, email, password, role, avatar });
      } else {
        await userService.updateUser({ name, email, role, avatar, uuid });
      }
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
      setAvatar(null);
      toast.success("Пользователь создан успешно");
      navigate("/employees");
    } catch (error) {
      toast.error("Ошибка при создании пользователя");
    }
  };
  return (
    <div className={`wrapper ${styles.container}`}>
      <h1>{action === "create" ? "Новый сотрудник" : "Обновление сотрудника"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.fieldGroup}>
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            type="text"
            placeholder="Введите имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.fieldGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {isCreate && (
          <div className={styles.fieldGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}
        
        {isCreate && isAdmin && (
          <div className={styles.fieldGroup}>
            <label htmlFor="role">Роль</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">Сотрудник</option>
              <option value="admin">Администратор</option>
            </select>
          </div>
        )}
        
        <div className={styles.fieldGroup}>
          <label htmlFor="avatar">Аватар</label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          />
          {avatar && (
            <div className={styles.avatarPreview}>
              <img 
                src={avatar instanceof File ? URL.createObjectURL(avatar) : `${import.meta.env.VITE_API_URL}${avatar}`} 
                alt="Предварительный просмотр аватара" 
                className={styles.avatarImage}
              />
              <p className={styles.avatarName}>
                {avatar instanceof File ? avatar.name : 'Текущий аватар'}
              </p>
            </div>
          )}
        </div>
        <Button variant="main" type="submit">
          {action === "create" ? "Создать" : "Обновить"}
        </Button>
      </form>
      <Button onClick={() => navigate("/employees")} variant="secondary">Назад</Button>
    </div>
  );
};
