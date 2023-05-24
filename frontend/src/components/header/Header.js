import styles from "./Header.module.scss";
import cn from "classnames";

export const Header = ({ title, subtitle, type }) => {
  return (
    <div className={cn(styles.Header, {[styles.Header__secondary]: type === "secondary"})}>
      <div className={styles.Header__title}>{title}</div>
      <div className={styles.Header__subtitle}>{subtitle}</div>
    </div>
  )
};

export default Header;