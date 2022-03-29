import styles from "./CardProfileStats.module.css";

const CardProfileStats = (props) => {
  const isMonsterCard = props?.cardType?.search("Monster");

  const isZeroOrAbove = (num) => {
    if (num >= 0) {
      return true;
    } else {
      return false;
    }
  };

  const basicMonsterStats = (
    <div className={styles["card-profile-stats__text-section"]}>
      <div className={styles["card-profile-stats__text-section-line"]}>
        {props.cardStarLevel && (
          <>
            <img
              className={styles["card-profile-stats__icon"]}
              src="/media/icons/star-symbol.png"
              alt="Card Level Symbol"
            />
            <span className={styles["card-profile-stats__numbers"]}>
              {props.cardStarLevel}
            </span>
          </>
        )}
      </div>
      <div className={styles["card-profile-stats__text-section-line"]}>
        {isZeroOrAbove(props.cardAttack) && (
          <>
            <img
              className={styles["card-profile-stats__icon"]}
              src="/media/icons/attack-symbol.png"
              alt="Card Attack Symbol"
            />
            <span className={styles["card-profile-stats__numbers"]}>
              {props.cardAttack}
            </span>
          </>
        )}
      </div>
      <div className={styles["card-profile-stats__text-section-line"]}>
        {isZeroOrAbove(props.cardDefense) && (
          <>
            <img
              className={styles["card-profile-stats__icon"]}
              src="/media/icons/defense-symbol.png"
              alt="Card Defense Symbol"
            />
            <span className={styles["card-profile-stats__numbers"]}>
              {props.cardDefense}
            </span>
          </>
        )}
      </div>
    </div>
  );

  const nonMonsterStats = (
    <div className={styles["card-profile-stats__text-section"]}>
      <div className={styles["card-profile-stats__text-section-line"]}>
        <p>Spell / Trap Type Symbol</p>
        <img src="#" alt="#" />
      </div>
    </div>
  );

  return (
    <div className={styles["card-profile-stats"]}>
      <div className={styles["card-profile-stats__img-section"]}>
        <img
          className={styles["card-profile-stats__img"]}
          src={props.cardImgSrc}
          alt={props.cardImgAlt}
        />
      </div>
      {isMonsterCard !== -1 && basicMonsterStats}
      {isMonsterCard === -1 && nonMonsterStats}
    </div>
  );
};

export default CardProfileStats;
