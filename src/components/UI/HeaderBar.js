import styles from "./HeaderBar.module.css";

const HeaderBar = (props) => {
  return <header className={styles.header}>{props.children}</header>;
};

export default HeaderBar;
