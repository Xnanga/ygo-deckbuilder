import styles from "./AppLogo.module.css";

const AppLogo = (props) => {
  return (
    <div className={styles["app-logo"]}>
      <div className={styles["app-logo__container"]}>
        <img
          className={styles["app-logo__img"]}
          src={props.imgSrc}
          alt={props.imgAlt}
        />
      </div>
      {props.optionalText && (
        <span className={styles["app-logo__text"]}>{props.optionalText}</span>
      )}
    </div>
  );
};

export default AppLogo;
