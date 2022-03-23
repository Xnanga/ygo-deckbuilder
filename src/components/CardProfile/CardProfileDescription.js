import styles from "./CardProfileDescription.module.css";

const CardProfileDescription = (props) => {
  return (
    <div className={styles["card-description"]}>{props.cardDescription}</div>
  );
};

export default CardProfileDescription;
