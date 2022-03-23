import styles from "./DeckBuilderMainLayout.module.css";

const DeckBuilderMainLayout = (props) => {
  return <div className={styles["main-layout"]}>{props.children}</div>;
};

export default DeckBuilderMainLayout;
