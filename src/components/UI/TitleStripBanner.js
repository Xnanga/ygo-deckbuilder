import styles from "./TitleStripBanner.module.css";

const TitleStripBanner = (props) => {
  const determineBackgroundColour = (cardType) => {
    if (!cardType) return;

    if (cardType?.search("Trap") !== -1) {
      return styles["title-strip-banner--trap"];
    }
    if (cardType?.search("Spell") !== -1) {
      return styles["title-strip-banner--spell"];
    }

    return styles["title-strip-banner--monster"];
  };

  return (
    <div
      className={`${styles["title-strip-banner"]} ${determineBackgroundColour(
        props.cardType
      )}`}
    >
      {props.primaryImgSrc && (
        <img
          className={styles["title-strip-banner__primary-img"]}
          src={props.primaryImgSrc}
          alt={props.primaryImgAlt}
        />
      )}
      <h2 className={styles["title-strip-banner__title"]}>{props.title}</h2>
      {props.number && (
        <span className={styles["title-strip-banner__number"]}>
          {props.number}
        </span>
      )}
      {props.secondaryImgSrc && (
        <img
          className={styles["title-strip-banner__secondary-img"]}
          src={props.secondaryImgSrc}
          alt={props.secondaryImgAlt}
        />
      )}
    </div>
  );
};

export default TitleStripBanner;
