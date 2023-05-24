import styles from "./Button.module.scss";
import cn from "classnames";

export const Button = ({ type, label, onClick }) => {
  return (
    <button
      className={cn(styles.Button, type === "dark" ? styles.Button_type_dark : styles.Button_type_light)}
      onClick={onClick}
    >
      {label}
    </button>
  )
};

export default Button;