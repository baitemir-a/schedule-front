import { useEffect, useState } from "react";
import { IUser } from "../../../types/user-types";
import userService from "../../../services/user-service";
import { Avatar } from "../../../ui/avatar/avatar";
import styles from "./profile.module.scss";
import { CopyText } from "../../../ui/copy-text/copy-text";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../ui/button/button";

export const Profile = () => {
  const [profile, setProfile] = useState<IUser | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    userService.getProfile().then((profile) => {
      setProfile(profile);
    });
  }, []);
  const { uuid } = useParams();
  useEffect(() => {
    if (uuid) {
      userService.getUser(uuid).then((user) => {
        setProfile(user);
      });
    }
  }, [uuid]);
  if (!profile) return <div>Loading...</div>;
  return (
    <div className="wrapper">
      <div className={styles.profile}>
        <Avatar size={170} avatar={profile.avatar} />
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.email}>{profile.email}</p>
        <p className={styles.role}>{profile.role}</p>
        <CopyText text={"uuid"} />
        <p className={styles.uuid}>{profile.uuid}</p>
      </div>
      <Button onClick={() => navigate("/")} variant="secondary">
        Назад
      </Button>
    </div>
  );
};
