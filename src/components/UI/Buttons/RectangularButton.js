import styles from "./RectangularButton.module.css";

const RectangularButton = (props) => {
  return (
    <button className={styles["rectangular-btn"]} onClick={props.onButtonClick}>
      <img
        className={styles["rectangular-btn__img"]}
        src={props.imgSrc}
        alt={props.imgAlt}
      />
      <span className={styles["rectangular-btn__text"]}>
        {props.buttonText}
      </span>
    </button>
  );
};

export default RectangularButton;