import styles from "./CardProfileStats.module.css";

const CardProfileStats = (props) => {
  return (
    <div className={styles["card-profile-stats"]}>
      <div className={styles["card-profile-stats__img-section"]}>
        <img
          className={styles["card-profile-stats__img"]}
          src={props.cardImgSrc}
          alt={props.cardImgAlt}
        />
      </div>
      <div className={styles["card-profile-stats__text-section"]}>
        <div className={styles["card-profile-stats__text-section-line"]}>
          <img
            className={styles["card-profile-stats__icon"]}
            src="/media/icons/star-symbol.png"
            alt="Card Level Symbol"
          />
          <span className={styles["card-profile-stats__numbers"]}>
            {props.cardStarLevel}
          </span>
        </div>
        <div className={styles["card-profile-stats__text-section-line"]}>
          <img
            className={styles["card-profile-stats__icon"]}
            src="/media/icons/attack-symbol.png"
            alt="Card Attack Symbol"
          />
          <span className={styles["card-profile-stats__numbers"]}>
            {props.cardAttack}
          </span>
        </div>
        <div className={styles["card-profile-stats__text-section-line"]}>
          <img
            className={styles["card-profile-stats__icon"]}
            src="/media/icons/defense-symbol.png"
            alt="Card Defense Symbol"
          />
          <span className={styles["card-profile-stats__numbers"]}>
            {props.cardDefense}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardProfileStats;
