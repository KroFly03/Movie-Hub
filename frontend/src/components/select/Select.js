import styles from "./Select.module.scss";

export const Select = ({ options, selected, onChange }) => {

  return (
    <div className={styles.Select}>
      <select onChange={onChange}>
        <option disabled={true} value={null} selected={!selected}>Не выбрано</option>
        {options && options.length > 0 && options.map(option => (
          <option
            selected={option.id === selected}
            value={option.id}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
};

export default Select;