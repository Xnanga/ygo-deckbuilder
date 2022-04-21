import styles from "./RectangularButton.module.css";

const RectangularButton = (props) => {
  const determineButtonClass = props.buttonInactive
    ? `${styles["rectangular-btn"]} ${styles["rectangular-btn--inactive"]}`
    : styles["rectangular-btn"];

  return (
    <button
      id={props.buttonId}
      className={determineButtonClass}
      onClick={props.onButtonClick}
    >
      {props.imgSrc && (
        <img
          className={styles["rectangular-btn__img"]}
          src={props.imgSrc}
          alt={props.imgAlt}
        />
      )}
      <span className={styles["rectangular-btn__text"]}>
        {props.buttonText}
      </span>
    </button>
  );
};

export default RectangularButton;
