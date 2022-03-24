import styles from "./CircularButton.module.css";

const CircularButton = (props) => {
  return (
    <button className={styles["circular-btn"]} onClick={props.onButtonClick}>
      <img
        className={styles["circular-btn__img"]}
        src={props.imgSrc}
        alt={props.imgAlt}
      />
    </button>
  );
};

export default CircularButton;
