import styles from "./CatalogueFilterMenu.module.css";

import RadioButton from "../UI/Buttons/RadioButton";
import RectangularButton from "../UI/Buttons/RectangularButton";
import { useState } from "react";

const CatalogueFilterMenu = (props) => {
  const [selectedType, setSelectedType] = useState(null);
  const selectedTypeMonster =
    selectedType !== "trap" && selectedType !== "spell" && selectedType !== null
      ? true
      : false;
  const selectedTypeXyz = selectedType?.includes("xyz") ? true : false;
  const selectedTypeLink = selectedType?.includes("link") ? true : false;

  const filterFormSubmitHandler = (e) => {
    e.preventDefault();
    const buttonClicked = e.nativeEvent.submitter.id;

    if (buttonClicked === "clear-filters") {
      props.dispatchCardData({
        type: "returnToSearchedData",
      });
      props.closeModalHandler();
      return;
    }

    const allFilters = [...e.target];
    const allSelectedFilters = allFilters.filter((option) => {
      return option.checked;
    });

    if (allSelectedFilters.length < 1) return;

    const filterMap = new Map();
    allSelectedFilters.forEach((filter) => {
      filterMap.set(filter.name, filter.id);
    });

    props.dispatchCardData({
      type: "applyCardFilters",
      data: filterMap,
    });

    props.closeModalHandler();
  };

  return (
    <form
      className={styles["catalogue-filter-menu"]}
      onSubmit={(e) => filterFormSubmitHandler(e)}
    >
      <p className={styles["catalogue-filter-menu__tagline"]}>
        Only cards matching all filter conditions will be displayed
      </p>
      <h2 className={styles["catalogue-filter-menu__title"]}>Card Type</h2>
      <div
        className={styles["catalogue-filter-menu__btns"]}
        onChange={(e) => setSelectedType(e.target.id)}
      >
        <RadioButton id="normal" name="type" label="Normal Monster" />
        <RadioButton id="effect" name="type" label="Effect Monster" />
        <RadioButton id="ritual" name="type" label="Ritual Monster" />
        <RadioButton id="fusion" name="type" label="Fusion Monster" />
        <RadioButton id="synchro" name="type" label="Synchro Monster" />
        <RadioButton id="xyz" name="type" label="XYZ Monster" />
        <RadioButton id="pendulum" name="type" label="Pendulum Monster" />
        <RadioButton id="link" name="type" label="Link Monster" />
        <RadioButton id="token" name="type" label="Token Monster" />
        <RadioButton id="spell" name="type" label="Spell" />
        <RadioButton id="trap" name="type" label="Trap" />
      </div>
      {selectedTypeMonster && (
        <>
          <h3 className={styles["catalogue-filter-menu__title--sub"]}>Race</h3>
          <div className={styles["catalogue-filter-menu__btns"]}>
            <RadioButton id="aqua" name="race" label="Aqua" />
            <RadioButton id="beast" name="race" label="Beast" />
            <RadioButton id="beast-warrior" name="race" label="Beast Warrior" />
            <RadioButton id="cyberse" name="race" label="Cyberse" />
            <RadioButton id="dinosaur" name="race" label="Dinosaur" />
            <RadioButton id="divine-beast" name="race" label="Divine Beast" />
            <RadioButton id="dragon" name="race" label="Dragon" />
            <RadioButton id="fairy" name="race" label="Fairy" />
            <RadioButton id="fiend" name="race" label="Fiend" />
            <RadioButton id="fish" name="race" label="Fish" />
            <RadioButton id="insect" name="race" label="Insect" />
            <RadioButton id="machine" name="race" label="Machine" />
            <RadioButton id="plant" name="race" label="Plant" />
            <RadioButton id="psychic" name="race" label="Psychic" />
            <RadioButton id="pyro" name="race" label="Pyro" />
            <RadioButton id="reptile" name="race" label="Reptile" />
            <RadioButton id="rock" name="race" label="Rock" />
            <RadioButton id="sea-serpent" name="race" label="Sea Serpent" />
            <RadioButton id="spellcaster" name="race" label="Spellcaster" />
            <RadioButton id="thunder" name="race" label="Thunder" />
            <RadioButton id="warrior" name="race" label="Warrior" />
            <RadioButton id="winged-beast" name="race" label="Winged Beast" />
            <RadioButton id="wyrm" name="race" label="Wyrm" />
            <RadioButton id="zombie" name="race" label="Zombie" />
          </div>

          {!selectedTypeLink && (
            <>
              <h3 className={styles["catalogue-filter-menu__title--sub"]}>
                Level / Rank
              </h3>
              <div className={styles["catalogue-filter-menu__btns"]}>
                <RadioButton id="1" name="level" label="1" />
                <RadioButton id="2" name="level" label="2" />
                <RadioButton id="3" name="level" label="3" />
                <RadioButton id="4" name="level" label="4" />
                <RadioButton id="5" name="level" label="5" />
                <RadioButton id="6" name="level" label="6" />
                <RadioButton id="7" name="level" label="7" />
                <RadioButton id="8" name="level" label="8" />
                <RadioButton id="9" name="level" label="9" />
                <RadioButton id="10" name="level" label="10" />
                <RadioButton id="11" name="level" label="11" />
                <RadioButton id="12" name="level" label="12" />
                <>
                  {selectedTypeXyz && (
                    <RadioButton id="13" name="level" label="13" />
                  )}
                </>
              </div>
            </>
          )}

          {selectedTypeLink && (
            <>
              <h3 className={styles["catalogue-filter-menu__title--sub"]}>
                Link Value
              </h3>
              <div className={styles["catalogue-filter-menu__btns"]}>
                <RadioButton id="1" name="linkval" label="1" />
                <RadioButton id="2" name="linkval" label="2" />
                <RadioButton id="3" name="linkval" label="3" />
                <RadioButton id="4" name="linkval" label="4" />
                <RadioButton id="5" name="linkval" label="5" />
                <RadioButton id="6" name="linkval" label="6" />
              </div>
            </>
          )}

          <h3 className={styles["catalogue-filter-menu__title--sub"]}>
            Attribute
          </h3>
          <div className={styles["catalogue-filter-menu__btns"]}>
            <RadioButton id="dark" name="attribute" label="Dark" />
            <RadioButton id="light" name="attribute" label="Light" />
            <RadioButton id="fire" name="attribute" label="Fire" />
            <RadioButton id="water" name="attribute" label="Water" />
            <RadioButton id="earth" name="attribute" label="Earth" />
            <RadioButton id="wind" name="attribute" label="Wind" />
            <RadioButton id="divine" name="attribute" label="Divine" />
          </div>
        </>
      )}
      <div className={styles["catalogue-filter-menu__submit-container"]}>
        <RectangularButton
          buttonId="apply-filters"
          buttonText="Apply Filters"
        />
        <RectangularButton
          buttonId="clear-filters"
          buttonText="Clear Filters"
        />
      </div>
    </form>
  );
};

export default CatalogueFilterMenu;
