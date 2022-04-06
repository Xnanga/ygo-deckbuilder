import { useContext } from "react";

import styles from "./CatalogueFilterMenu.module.css";

import CardsContext from "../../Context/card-context";
import RadioButton from "../UI/Buttons/RadioButton";
import RectangularButton from "../UI/Buttons/RectangularButton";

const CatalogueFilterMenu = () => {
  const ctx = useContext(CardsContext);

  const filterFormSubmitHandler = (e) => {
    e.preventDefault();
    const buttonId = e.nativeEvent.submitter.id;

    if (buttonId === "apply-filters") {
      const allRadioButtons = [...e.target];
      const allCheckedRadioButtons = allRadioButtons.filter((input) => {
        return input.checked;
      });

      // Blank filter object to recieve values
      let filterObj = {
        cardType: null,
        monsterType: null,
        monsterRace: null,
        monsterLevel: null,
        monsterRank: null,
        monsterLinkValue: null,
        monsterAttribute: null,
        spellType: null,
        trapType: null,
      };

      // Populate filter object with button values
      allCheckedRadioButtons.forEach((button) => {
        if (button.name === "card-type") filterObj.cardType = button.id;
        if (button.name === "monster-type") filterObj.monsterType = button.id;
        if (button.name === "monster-race") filterObj.monsterRace = button.id;
        if (button.name === "monster-level") filterObj.monsterLevel = button.id;
        if (button.name === "monster-rank") filterObj.monsterRank = button.id;
        if (button.name === "monster-link-value")
          filterObj.monsterLinkValue = button.id;
        if (button.name === "monster-attribute")
          filterObj.monsterAttribute = button.id;
      });

      // ctx.setActiveCardFilters(filterObj);
      ctx.dispatchCardData({
        type: "applyCardFilters",
        data: filterObj,
      });
    }

    if (buttonId === "clear-filters") {
      // ctx.setActiveCardFilters({});
    }
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
      <div className={styles["catalogue-filter-menu__btns"]}>
        <RadioButton id="monster-card" name="card-type" label="Monster" />
        <RadioButton id="spell-card" name="card-type" label="Spell" />
        <RadioButton id="trap-card" name="card-type" label="Trap" />
      </div>
      <h2 className={styles["catalogue-filter-menu__title"]}>Monsters</h2>
      <h3 className={styles["catalogue-filter-menu__title--sub"]}>Type</h3>
      <div className={styles["catalogue-filter-menu__btns"]}>
        <RadioButton id="normal-monster" name="monster-type" label="Normal" />
        <RadioButton id="effect-monster" name="monster-type" label="Effect" />
        <RadioButton id="ritual-monster" name="monster-type" label="Ritual" />
        <RadioButton id="fusion-monster" name="monster-type" label="Fusion" />
        <RadioButton id="synchro-monster" name="monster-type" label="Synchro" />
        <RadioButton id="xyz-monster" name="monster-type" label="XYZ" />
        <RadioButton
          id="pendulum-monster"
          name="monster-type"
          label="Pendulum"
        />
        <RadioButton id="link-monster" name="monster-type" label="Link" />
        <RadioButton id="token-monster" name="monster-type" label="Token" />
      </div>
      <h3 className={styles["catalogue-filter-menu__title--sub"]}>Race</h3>
      <div className={styles["catalogue-filter-menu__btns"]}>
        <RadioButton id="aqua-monster" name="monster-race" label="Aqua" />
        <RadioButton id="beast" name="monster-race" label="Beast" />
        <RadioButton
          id="beast-warrior-monster"
          name="monster-race"
          label="Beast Warrior"
        />
        <RadioButton id="cyberse-monster" name="monster-race" label="Cyberse" />
        <RadioButton
          id="dinosaur-monster"
          name="monster-race"
          label="Dinosaur"
        />
        <RadioButton
          id="divine-beast-monster"
          name="monster-race"
          label="Divine Beast"
        />
        <RadioButton id="dragon-monster" name="monster-race" label="Dragon" />
        <RadioButton id="fairy-monster" name="monster-race" label="Fairy" />
        <RadioButton id="fiend-monster" name="monster-race" label="Fiend" />
        <RadioButton id="fish-monster" name="monster-race" label="Fish" />
        <RadioButton id="insect-monster" name="monster-race" label="Insect" />
        <RadioButton id="machine-monster" name="monster-race" label="Machine" />
        <RadioButton id="plant-monster" name="monster-race" label="Plant" />
        <RadioButton id="psychic-monster" name="monster-race" label="Psychic" />
        <RadioButton id="pyro-monster" name="monster-race" label="Pyro" />
        <RadioButton id="reptile-monster" name="monster-race" label="Reptile" />
        <RadioButton id="rock-monster" name="monster-race" label="Rock" />
        <RadioButton
          id="sea-serpent-monster"
          name="monster-race"
          label="Sea Serpent"
        />
        <RadioButton
          id="spellcaster-monster"
          name="monster-race"
          label="Spellcaster"
        />
        <RadioButton id="thunder-monster" name="monster-race" label="Thunder" />
        <RadioButton id="warrior-monster" name="monster-race" label="Warrior" />
        <RadioButton
          id="winged-beast-monster"
          name="monster-race"
          label="Winged Beast"
        />
        <RadioButton id="wyrm-monster" name="monster-race" label="Wyrm" />
        <RadioButton id="zombie-monster" name="monster-race" label="Zombie" />
      </div>
      <h3 className={styles["catalogue-filter-menu__title--sub"]}>Level</h3>
      <div className={styles["catalogue-filter-menu__btns"]}>
        <RadioButton id="level-one" name="monster-level" label="1" />
        <RadioButton id="level-two" name="monster-level" label="2" />
        <RadioButton id="level-three" name="monster-level" label="3" />
        <RadioButton id="level-four" name="monster-level" label="4" />
        <RadioButton id="level-five" name="monster-level" label="5" />
        <RadioButton id="level-six" name="monster-level" label="6" />
        <RadioButton id="level-seven" name="monster-level" label="7" />
        <RadioButton id="level-eight" name="monster-level" label="8" />
        <RadioButton id="level-nine" name="monster-level" label="9" />
        <RadioButton id="level-ten" name="monster-level" label="10" />
        <RadioButton id="level-eleven" name="monster-level" label="11" />
        <RadioButton id="level-twelve" name="monster-level" label="12" />
      </div>
      <h3 className={styles["catalogue-filter-menu__title--sub"]}>Rank</h3>
      <div className={styles["catalogue-filter-menu__btns"]}>
        <RadioButton id="rank-one" name="monster-rank" label="1" />
        <RadioButton id="rank-two" name="monster-rank" label="2" />
        <RadioButton id="rank-three" name="monster-rank" label="3" />
        <RadioButton id="rank-four" name="monster-rank" label="4" />
        <RadioButton id="rank-five" name="monster-rank" label="5" />
        <RadioButton id="rank-six" name="monster-rank" label="6" />
        <RadioButton id="rank-seven" name="monster-rank" label="7" />
        <RadioButton id="rank-eight" name="monster-rank" label="8" />
        <RadioButton id="rank-nine" name="monster-rank" label="9" />
        <RadioButton id="rank-ten" name="monster-rank" label="10" />
        <RadioButton id="rank-eleven" name="monster-rank" label="11" />
        <RadioButton id="rank-twelve" name="monster-rank" label="12" />
        <RadioButton id="rank-thirteen" name="monster-rank" label="13" />
      </div>
      <h3 className={styles["catalogue-filter-menu__title--sub"]}>
        Link Value
      </h3>
      <div className={styles["catalogue-filter-menu__btns"]}>
        <RadioButton id="link-one" name="monster-link-value" label="1" />
        <RadioButton id="link-two" name="monster-link-value" label="2" />
        <RadioButton id="link-three" name="monster-link-value" label="3" />
        <RadioButton id="link-four" name="monster-link-value" label="4" />
        <RadioButton id="link-five" name="monster-link-value" label="5" />
        <RadioButton id="link-six" name="monster-link-value" label="6" />
      </div>
      <h3 className={styles["catalogue-filter-menu__title--sub"]}>Attribute</h3>
      <div className={styles["catalogue-filter-menu__btns"]}>
        <RadioButton id="dark" name="monster-attribute" label="Dark" />
        <RadioButton id="light" name="monster-attribute" label="Light" />
        <RadioButton id="fire" name="monster-attribute" label="Fire" />
        <RadioButton id="water" name="monster-attribute" label="Water" />
        <RadioButton id="earth" name="monster-attribute" label="Earth" />
        <RadioButton id="wind" name="monster-attribute" label="Wind" />
        <RadioButton id="divine" name="monster-attribute" label="Divine" />
      </div>
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
