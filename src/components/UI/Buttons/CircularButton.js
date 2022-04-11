import styles from "./CircularButton.module.css";

const CircularButton = (props) => {
  const determineActiveClass = () => {
    return props.active
      ? `${styles["circular-btn"]} ${styles["circular-btn--active"]}`
      : styles["circular-btn"];
  };

  return (
    <button
      className={determineActiveClass()}
      onClick={props.onButtonClick}
      value={props.value}
    >
      <img
        className={styles["circular-btn__img"]}
        src={props.imgSrc}
        alt={props.imgAlt}
      />
    </button>
  );
};

export default CircularButton;
