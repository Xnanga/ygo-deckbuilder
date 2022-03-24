import styles from "./GreyStripBanner.module.css";

const GreyStripBanner = (props) => {
  return <div className={styles["grey-strip-banner"]}>{props.children}</div>;
};

export default GreyStripBanner;
