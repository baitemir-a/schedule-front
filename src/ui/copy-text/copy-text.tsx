import copyIcon from "../../assets/copy-icon.svg";
import copyIconBlue from "../../assets/copy-icon-blue.svg";
import styles from "./copy-text.module.scss";
import { useState } from "react";
import { toast } from "react-toastify";
export const CopyText = ({ text }: { text: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.success("Скопировано");
      }}
      className={styles.copyText}
    >
      <span>{text}</span>
      <span>
        <img src={isHovered ? copyIconBlue : copyIcon} alt="copy" />
      </span>
    </div>
  );
};
