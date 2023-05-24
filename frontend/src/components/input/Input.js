import styles from "./Input.module.scss";

export const Input = ({ value, type, placeholder, onChange }) => {

  return (
    <div className={styles.Input}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
};

export default Input;