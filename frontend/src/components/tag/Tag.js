import styles from "./Tag.module.scss";
import {Link} from "react-router-dom";

export const Tag = ({ id, label, type }) => {
  return (
    <Link
      className={styles.Tag}
      to={`/${type}/${id}`}
    >
      {label}
    </Link>
  )

}

export default Tag;