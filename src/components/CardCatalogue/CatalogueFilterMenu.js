import { useState, useRef } from "react";

import styles from "./CatalogueFilterMenu.module.css";

import CatalogueFilterMenuData from "./CatalogueFilterMenuData";
import RadioButton from "../UI/Buttons/RadioButton";
import RectangularButton from "../UI/Buttons/RectangularButton";

const CatalogueFilterMenu = (props) => {
  const [selectedType, setSelectedType] = useState(null);
  const formElement = useRef(null);
  const selectedTypeMonster =
    selectedType !== "trap" && selectedType !== "spell" && selectedType !== null
      ? true
      : false;
  const selectedTypeTrap = selectedType?.includes("trap") ? true : false;
  const selectedTypeSpell = selectedType?.includes("spell") ? true : false;
  const selectedTypeXyz = selectedType?.includes("xyz") ? true : false;
  const selectedTypeLink = selectedType?.includes("link") ? true : false;

  const filterFormSubmitHandler = (e) => {
    e.preventDefault();
    const buttonClicked = e.nativeEvent.submitter.id;

    if (buttonClicked === "clear-selection") {
      uncheckAllRadioButtons();
      return;
    }

    const allFilters = [...e.target];
    const allSelectedFilters = allFilters.filter((option) => {
      return option.checked;
    });

    if (allSelectedFilters.length < 1) return;

    const filterMap = new Map();
    allSelectedFilters.forEach((filter) => {
      filterMap.set(filter.value, filter.id);
    });

    props.dispatchCardData({
      type: "applyCardFilters",
      data: filterMap,
    });

    props.closeModalHandler();
  };

  const renderFilterButtons = (buttonDataList) => {
    const renderedButtons = buttonDataList.map((button) => {
      return (
        <RadioButton
          key={button.id}
          id={button.id}
          name={button.name}
          value={button.value}
          label={button.label}
        />
      );
    });

    return renderedButtons;
  };

  const uncheckAllRadioButtons = () => {
    if (formElement.current === null) return;
    const allCurrentRadioButtons =
      formElement.current.querySelectorAll("input");
    allCurrentRadioButtons.forEach((button) => (button.checked = false));
  };

  return (
    <form
      ref={formElement}
      className={styles["catalogue-filter-menu"]}
      onSubmit={(e) => filterFormSubmitHandler(e)}
    >
      <h2 className={styles["catalogue-filter-menu__title"]}>Card Type</h2>
      <div
        className={styles["catalogue-filter-menu__btns"]}
        onChange={(e) => setSelectedType(e.target.id)}
      >
        {renderFilterButtons(CatalogueFilterMenuData.cardType)}
      </div>
      {selectedTypeMonster && (
        <>
          <h3 className={styles["catalogue-filter-menu__title--sub"]}>Race</h3>
          <div className={styles["catalogue-filter-menu__btns"]}>
            {renderFilterButtons(CatalogueFilterMenuData.cardRace)}
          </div>
          {!selectedTypeLink && (
            <>
              <h3 className={styles["catalogue-filter-menu__title--sub"]}>
                Level / Rank
              </h3>
              <div className={styles["catalogue-filter-menu__btns"]}>
                {renderFilterButtons(CatalogueFilterMenuData.cardLevel)}
                {selectedTypeXyz && (
                  <RadioButton
                    id="13"
                    name="monster-level"
                    value="level"
                    label="13"
                  />
                )}
              </div>
            </>
          )}
          {selectedTypeLink && (
            <>
              <h3 className={styles["catalogue-filter-menu__title--sub"]}>
                Link Value
              </h3>
              <div className={styles["catalogue-filter-menu__btns"]}>
                {renderFilterButtons(CatalogueFilterMenuData.cardLinkVal)}
              </div>
            </>
          )}

          <h3 className={styles["catalogue-filter-menu__title--sub"]}>
            Attribute
          </h3>
          <div className={styles["catalogue-filter-menu__btns"]}>
            {renderFilterButtons(CatalogueFilterMenuData.cardAttribute)}
          </div>
        </>
      )}
      {selectedTypeSpell && (
        <>
          <h3 className={styles["catalogue-filter-menu__title--sub"]}>Type</h3>
          <div className={styles["catalogue-filter-menu__btns"]}>
            {renderFilterButtons(CatalogueFilterMenuData.cardSpellRace)}
          </div>
        </>
      )}
      {selectedTypeTrap && (
        <>
          <h3 className={styles["catalogue-filter-menu__title--sub"]}>Type</h3>
          <div className={styles["catalogue-filter-menu__btns"]}>
            {renderFilterButtons(CatalogueFilterMenuData.cardTrapRace)}
          </div>
        </>
      )}
      <div className={styles["catalogue-filter-menu__submit-container"]}>
        <RectangularButton
          buttonId="apply-filters"
          buttonText="Apply Filters"
        />
        <RectangularButton
          buttonId="clear-selection"
          buttonText="Clear Selection"
        />
      </div>
    </form>
  );
};

export default CatalogueFilterMenu;
