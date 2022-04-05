import styles from "./CheckBox.module.css";

const CheckBox = (props) => {
  return (
    <>
      <label className={styles["checkbox-label"]} htmlFor={props.id}>
        <input
          className={styles["checkbox-input"]}
          type="checkbox"
          id={props.id}
          name={props.name}
          checked={props.checked}
        />
        <span className={styles["checkbox-text"]}>{props.label}</span>
        <span className={styles["checkbox-checkmark"]}></span>
      </label>
    </>
  );
};

export default CheckBox;
