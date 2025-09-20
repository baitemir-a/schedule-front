import { useEffect, useState } from "react";
import { IUser } from "../../../types/user-types";
import userService from "../../../services/user-service";
import { Avatar } from "../../../ui/avatar/avatar";
import styles from "./profile.module.scss";
import { CopyText } from "../../../ui/copy-text/copy-text";

export const Profile = () => {
  const [profile, setProfile] = useState<IUser | null>(null)
  useEffect(() => {
    userService.getProfile().then((profile) => {
      setProfile(profile)
    })
  }, [])
  if (!profile) return <div>Loading...</div>
  return <div className={styles.profile}>
    <Avatar size={170} avatar={profile.avatar} />
    <h1 className={styles.name} >{profile.name}</h1>
    <p className={styles.email} >{profile.email}</p>
    <p className={styles.role} >{profile.role}</p>
    <CopyText text={'uuid'} />
    <p className={styles.uuid} >{profile.uuid}</p>
  </div>;
}