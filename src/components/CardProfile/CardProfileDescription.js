import styles from "./CardProfileDescription.module.css";

const CardProfileDescription = (props) => {
  return (
    <div className={styles["card-description"]}>
      <p>{props.cardDescription}</p>
    </div>
  );
};

export default CardProfileDescription;
