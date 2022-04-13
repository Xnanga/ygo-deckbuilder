import styles from "./CardProfileStats.module.css";

import CardProfileImage from "./CardProfileImage";
import LoadingGif from "../UI/LoadingGif";

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

  const determineLevelType = (cardType) => {
    if (cardType.includes("XYZ")) {
      return "/media/icons/rank-symbol.png";
    } else {
      return "/media/icons/star-symbol.png";
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
              src={determineLevelType(props.cardType)}
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
      <div className={styles["card-profile-stats__text-section-line"]}>
        {props.cardLinkValue && (
          <>
            {/* <img
              className={styles["card-profile-stats__icon"]}
              src="/media/icons/defense-symbol.png"
              alt="Card Defense Symbol"
            /> */}
            <span className={styles["card-profile-stats__numbers"]}>
              {`Link: ${props.cardLinkValue}`}
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
        <CardProfileImage
          cardImgSrc={props.cardImgSrc}
          cardImgAlt={props.cardImgAlt}
        />
      </div>
      {isMonsterCard !== -1 && basicMonsterStats}
      {isMonsterCard === -1 && nonMonsterStats}
    </div>
  );
};

export default CardProfileStats;
