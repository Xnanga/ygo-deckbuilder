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
  const selectedTypeTrap = selectedType?.includes("trap") ? true : false;
  const selectedTypeSpell = selectedType?.includes("spell") ? true : false;
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
      filterMap.set(filter.value, filter.id);
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
        <RadioButton
          id="normal monster"
          name="type"
          value="type"
          label="Normal Monster"
        />
        <RadioButton
          id="effect"
          name="type"
          value="type"
          label="Effect Monster"
        />
        <RadioButton
          id="ritual"
          name="type"
          value="type"
          label="Ritual Monster"
        />
        <RadioButton
          id="fusion"
          name="type"
          value="type"
          label="Fusion Monster"
        />
        <RadioButton
          id="synchro"
          name="type"
          value="type"
          label="Synchro Monster"
        />
        <RadioButton id="xyz" name="type" value="type" label="XYZ Monster" />
        <RadioButton
          id="pendulum"
          name="type"
          value="type"
          label="Pendulum Monster"
        />
        <RadioButton id="link" name="type" value="type" label="Link Monster" />
        <RadioButton
          id="token"
          name="type"
          value="type"
          label="Token Monster"
        />
        <RadioButton id="spell" name="type" value="type" label="Spell" />
        <RadioButton id="trap" name="type" value="type" label="Trap" />
      </div>
      {selectedTypeMonster && (
        <>
          <h3 className={styles["catalogue-filter-menu__title--sub"]}>Race</h3>
          <div className={styles["catalogue-filter-menu__btns"]}>
            <RadioButton
              id="aqua"
              name="monster-race"
              value="race"
              label="Aqua"
            />
            <RadioButton
              id="beast"
              name="monster-race"
              value="race"
              label="Beast"
            />
            <RadioButton
              id="beast-warrior"
              name="monster-race"
              value="race"
              label="Beast Warrior"
            />
            <RadioButton
              id="cyberse"
              name="monster-race"
              value="race"
              label="Cyberse"
            />
            <RadioButton
              id="dinosaur"
              name="monster-race"
              value="race"
              label="Dinosaur"
            />
            <RadioButton
              id="divine-beast"
              name="monster-race"
              value="race"
              label="Divine Beast"
            />
            <RadioButton
              id="dragon"
              name="monster-race"
              value="race"
              label="Dragon"
            />
            <RadioButton
              id="fairy"
              name="monster-race"
              value="race"
              label="Fairy"
            />
            <RadioButton
              id="fiend"
              name="monster-race"
              value="race"
              label="Fiend"
            />
            <RadioButton
              id="fish"
              name="monster-race"
              value="race"
              label="Fish"
            />
            <RadioButton
              id="insect"
              name="monster-race"
              value="race"
              label="Insect"
            />
            <RadioButton
              id="machine"
              name="monster-race"
              value="race"
              label="Machine"
            />
            <RadioButton
              id="plant"
              name="monster-race"
              value="race"
              label="Plant"
            />
            <RadioButton
              id="psychic"
              name="monster-race"
              value="race"
              label="Psychic"
            />
            <RadioButton
              id="pyro"
              name="monster-race"
              value="race"
              label="Pyro"
            />
            <RadioButton
              id="reptile"
              name="monster-race"
              value="race"
              label="Reptile"
            />
            <RadioButton
              id="rock"
              name="monster-race"
              value="race"
              label="Rock"
            />
            <RadioButton
              id="sea-serpent"
              name="monster-race"
              value="race"
              label="Sea Serpent"
            />
            <RadioButton
              id="spellcaster"
              name="monster-race"
              value="race"
              label="Spellcaster"
            />
            <RadioButton
              id="thunder"
              name="monster-race"
              value="race"
              label="Thunder"
            />
            <RadioButton
              id="warrior"
              name="monster-race"
              value="race"
              label="Warrior"
            />
            <RadioButton
              id="winged-beast"
              name="monster-race"
              value="race"
              label="Winged Beast"
            />
            <RadioButton
              id="wyrm"
              name="monster-race"
              value="race"
              label="Wyrm"
            />
            <RadioButton
              id="zombie"
              name="monster-race"
              value="race"
              label="Zombie"
            />
          </div>

          {!selectedTypeLink && (
            <>
              <h3 className={styles["catalogue-filter-menu__title--sub"]}>
                Level / Rank
              </h3>
              <div className={styles["catalogue-filter-menu__btns"]}>
                <RadioButton
                  id="1"
                  name="monster-level"
                  value="level"
                  label="1"
                />
                <RadioButton
                  id="2"
                  name="monster-level"
                  value="level"
                  label="2"
                />
                <RadioButton
                  id="3"
                  name="monster-level"
                  value="level"
                  label="3"
                />
                <RadioButton
                  id="4"
                  name="monster-level"
                  value="level"
                  label="4"
                />
                <RadioButton
                  id="5"
                  name="monster-level"
                  value="level"
                  label="5"
                />
                <RadioButton
                  id="6"
                  name="monster-level"
                  value="level"
                  label="6"
                />
                <RadioButton
                  id="7"
                  name="monster-level"
                  value="level"
                  label="7"
                />
                <RadioButton
                  id="8"
                  name="monster-level"
                  value="level"
                  label="8"
                />
                <RadioButton
                  id="9"
                  name="monster-level"
                  value="level"
                  label="9"
                />
                <RadioButton
                  id="10"
                  name="monster-level"
                  value="level"
                  label="10"
                />
                <RadioButton
                  id="11"
                  name="monster-level"
                  value="level"
                  label="11"
                />
                <RadioButton
                  id="12"
                  name="monster-level"
                  value="level"
                  label="12"
                />
                <>
                  {selectedTypeXyz && (
                    <RadioButton
                      id="13"
                      name="monster-level"
                      value="level"
                      label="13"
                    />
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
                <RadioButton
                  id="1"
                  name="monster-linkval"
                  value="linkval"
                  label="1"
                />
                <RadioButton
                  id="2"
                  name="monster-linkval"
                  value="linkval"
                  label="2"
                />
                <RadioButton
                  id="3"
                  name="monster-linkval"
                  value="linkval"
                  label="3"
                />
                <RadioButton
                  id="4"
                  name="monster-linkval"
                  value="linkval"
                  label="4"
                />
                <RadioButton
                  id="5"
                  name="monster-linkval"
                  value="linkval"
                  label="5"
                />
                <RadioButton
                  id="6"
                  name="monster-linkval"
                  value="linkval"
                  label="6"
                />
              </div>
            </>
          )}

          <h3 className={styles["catalogue-filter-menu__title--sub"]}>
            Attribute
          </h3>
          <div className={styles["catalogue-filter-menu__btns"]}>
            <RadioButton
              id="dark"
              name="monster-attribute"
              value="attribute"
              label="Dark"
            />
            <RadioButton
              id="light"
              name="monster-attribute"
              value="attribute"
              label="Light"
            />
            <RadioButton
              id="fire"
              name="monster-attribute"
              value="attribute"
              label="Fire"
            />
            <RadioButton
              id="water"
              name="monster-attribute"
              value="attribute"
              label="Water"
            />
            <RadioButton
              id="earth"
              name="monster-attribute"
              value="attribute"
              label="Earth"
            />
            <RadioButton
              id="wind"
              name="monster-attribute"
              value="attribute"
              label="Wind"
            />
            <RadioButton
              id="divine"
              name="monster-attribute"
              value="attribute"
              label="Divine"
            />
          </div>
        </>
      )}
      {selectedTypeSpell && (
        <>
          <h3 className={styles["catalogue-filter-menu__title--sub"]}>Type</h3>
          <div className={styles["catalogue-filter-menu__btns"]}>
            <RadioButton
              id="normal"
              name="spell-race"
              value="race"
              label="Normal"
            />
            <RadioButton
              id="quick-play"
              name="spell-race"
              value="race"
              label="Quick-play"
            />
            <RadioButton
              id="continuous"
              name="spell-race"
              value="race"
              label="Continuous"
            />
            <RadioButton
              id="field"
              name="spell-race"
              value="race"
              label="Field"
            />
            <RadioButton
              id="equip"
              name="spell-race"
              value="race"
              label="Equip"
            />
            <RadioButton
              id="ritual"
              name="spell-race"
              value="race"
              label="Ritual"
            />
          </div>
        </>
      )}
      {selectedTypeTrap && (
        <>
          <h3 className={styles["catalogue-filter-menu__title--sub"]}>Type</h3>
          <div className={styles["catalogue-filter-menu__btns"]}>
            <RadioButton
              id="normal"
              name="trap-race"
              value="race"
              label="Normal"
            />
            <RadioButton
              id="continuous"
              name="trap-race"
              value="race"
              label="Continuous"
            />
            <RadioButton
              id="counter"
              name="trap-race"
              value="race"
              label="Counter"
            />
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
