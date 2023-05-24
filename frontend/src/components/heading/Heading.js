import styles from "./Heading.module.scss";

export const Heading = ({ label }) => {
  return (
    <div className={styles.Heading}>
      {label}
    </div>
  )
};

export default Heading;