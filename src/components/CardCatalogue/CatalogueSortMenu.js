import styles from "./CatalogueSortMenu.module.css";

import RadioButton from "../UI/Buttons/RadioButton";
import RectangularButton from "../UI/Buttons/RectangularButton";

const CatalogueSortMenu = (props) => {
  const sortFormSubmitHandler = (e) => {
    e.preventDefault();
    const allSortOptions = [...e.target];
    const selectedSort = allSortOptions.filter((option) => {
      return option.checked;
    });
    const sortKey = selectedSort[0].value;
    const sortValue = selectedSort[0].id;
    let direction = "";
    const sortMap = new Map();
    sortMap.set(sortKey, sortValue);
    if (sortMap.get(sortKey).includes("ascending")) direction = "ascending";
    if (sortMap.get(sortKey).includes("descending")) direction = "descending";

    props.dispatchCardData({
      type: "applyCardSorting",
      attribute: sortKey,
      direction: direction,
    });

    props.closeModalHandler();
  };

  return (
    <form
      className={styles["catalogue-sort-menu"]}
      onSubmit={(e) => sortFormSubmitHandler(e)}
    >
      <p className={styles["catalogue-sort-menu__tagline"]}>
        Sort cards by common attributes
      </p>
      <div
        className={styles["catalogue-sort-menu__section"]}
        onChange={(e) => console.log("Button Press")}
      >
        <h2 className={styles["catalogue-sort-menu__title"]}>Level/Rank:</h2>
        <div className={styles["catalogue-sort-menu__btns"]}>
          <RadioButton
            id="level-ascending"
            name="sort"
            value="level"
            label="Ascending"
          />
          <RadioButton
            id="level-descending"
            name="sort"
            value="level"
            label="Descending"
          />
        </div>
      </div>
      <div
        className={styles["catalogue-sort-menu__section"]}
        onChange={(e) => console.log("Button Press")}
      >
        <h2 className={styles["catalogue-sort-menu__title"]}>Attack:</h2>
        <div className={styles["catalogue-sort-menu__btns"]}>
          <RadioButton
            id="attack-ascending"
            name="sort"
            value="atk"
            label="Ascending"
          />
          <RadioButton
            id="attack-descending"
            name="sort"
            value="atk"
            label="Descending"
          />
        </div>
      </div>
      <div
        className={styles["catalogue-sort-menu__section"]}
        onChange={(e) => console.log("Button Press")}
      >
        <h2 className={styles["catalogue-sort-menu__title"]}>Defense:</h2>
        <div className={styles["catalogue-sort-menu__btns"]}>
          <RadioButton
            id="defense-ascending"
            name="sort"
            value="def"
            label="Ascending"
          />
          <RadioButton
            id="defense-descending"
            name="sort"
            value="def"
            label="Descending"
          />
        </div>
      </div>
      <div className={styles["catalogue-sort-menu__submit-container"]}>
        <RectangularButton buttonId="apply-sort" buttonText="Apply Sort" />
      </div>
    </form>
  );
};

export default CatalogueSortMenu;
