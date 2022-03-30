import styles from "./CardProfileStats.module.css";

const isZeroOrAbove = (num) => {
  if (num >= 0) {
    return true;
  } else {
    return false;
  }
};

const CardProfileStats = (props) => {
  const isMonsterCard = props?.cardType?.search("Monster");

  const determineCardTypeIcon = (raceProperty) => {
    switch (raceProperty) {
      case "Continuous":
        return "/media/icons/continuous-symbol.png";
      case "Counter":
        return "/media/icons/counter-trap-symbol.png";
      case "Equip":
        return "/media/icons/equip-spell-symbol.png";
      case "Field":
        return "/media/icons/field-spell-symbol.png";
      case "Quick-Play":
        return "/media/icons/quick-play-spell-symbol.png";
      case "Ritual":
        return "/media/icons/ritual-spell-symbol.png";
      default:
        return false;
    }
  };

  const determineRaceIconVisibility = determineCardTypeIcon(props.cardRace) ? (
    <img
      className={styles["card-profile-stats__icon"]}
      src={determineCardTypeIcon(props.cardRace)}
      alt="#"
    />
  ) : (
    ""
  );

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
        {determineRaceIconVisibility}
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
