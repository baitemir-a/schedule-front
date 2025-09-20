import { useEffect, useState } from "react";
import { IUser } from "../../../types/user-types";
import userService from "../../../services/user-service";
import { Avatar } from "../../../ui/avatar/avatar";
import styles from "./profile.module.scss";
import { CopyText } from "../../../ui/copy-text/copy-text";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../ui/button/button";
import { JournalSlider } from "../../../ui/journal-slider/journal-slider";
import journalService from "../../../services/journal-service";
import { IJournal } from "../../../types/journal-types";
import { BackButton } from "../../../ui/back-button/back-button";


export const Profile = () => {
  const [profile, setProfile] = useState<IUser | null>(null);
  const [journals, setJournals] = useState<IJournal[] | null>(null);
  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    userService.getProfile().then((profile) => {
      setProfile(profile);
    });
    if (!uuid) {
      journalService.getMyJournal().then((journal) => {
        setJournals(journal);
      });
    }
    else {
      journalService.getJournal(uuid).then((journal) => {
        setJournals(journal);
      });
    }
  }, []);
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
        <div className={styles.updateButton}>
          <Button
            onClick={() => navigate("/user/update/" + profile.uuid)}
            full={false}
            variant="main"
          >
            Редактировать
          </Button>
        </div>
        <JournalSlider journal={journals} />
      </div>
      <BackButton />
    </div>
  );
};
