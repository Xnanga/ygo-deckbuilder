import styles from "./CatalogueTextSearch.module.css";

const CatalogueTextSearch = () => {
  return (
    <form className={styles["catalogue-form"]}>
      <input className={styles["catalogue-form__input"]} type="text" />
      <label className={styles["catalogue-form__label"]} htmlFor=""></label>
    </form>
  );
};

export default CatalogueTextSearch;
