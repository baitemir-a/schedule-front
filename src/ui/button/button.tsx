import { ReactNode } from "react";
import styles from "./button.module.scss";
type Props = {
  children: ReactNode;
  variant: "main" | "danger" | "secondary";
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  full?: boolean;
  onClick?: (e: any) => void;
};

export default function Button({
  children,
  variant,
  type,
  disabled,
  full=true,
  onClick,
}: Props) {
  return (
    <button
      disabled={disabled}
      type={type}
      style={full?{width:'100%'}:{width:'auto'}}
      className={styles.button + " " + styles[variant]}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
