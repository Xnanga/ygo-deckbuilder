import styles from "./RadioButton.module.css";

const RadioButton = (props) => {
  return (
    <>
      <label className={styles["checkbox-label"]} htmlFor={props.id}>
        <input
          className={styles["checkbox-input"]}
          type="radio"
          id={props.id}
          name={props.name}
        />
        <span className={styles["checkbox-text"]}>{props.label}</span>
        <img
          className={styles["checkbox-img"]}
          src="/media/icons/green-tick-icon.png"
          alt="A Green Tick Icon"
        />
      </label>
    </>
  );
};

export default RadioButton;
