import avatarDefault from "../../assets/avatar-default.png";
import styles from "./avatar.module.scss";

interface Props {
  avatar: string;
  size?: number;
}
export const Avatar = ({ avatar, size = 100 }: Props) => {
  return (
    <div
      className={styles.avatar}
      style={{
        backgroundImage: `url(${
          avatar ? `${import.meta.env.VITE_API_URL}${avatar}` : avatarDefault
        })`,
        width: size,
        height: size,
      }}
    ></div>
  );
};
