import styles from "./LoadingGif.module.css";

const LoadingGif = () => {
  return (
    <div className={styles["loading-gif"]}>
      <img
        className={styles["loading-gif__img"]}
        src="/media/icons/card-back-icon.png"
        alt="The back of a trading card"
      />
    </div>
  );
};

export default LoadingGif;
