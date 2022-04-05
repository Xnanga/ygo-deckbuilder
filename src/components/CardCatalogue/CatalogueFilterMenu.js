import styles from "./CatalogueFilterMenu.module.css";

import CheckBox from "../UI/Checkboxes/CheckBox";

const CatalogueFilterMenu = () => {
  return (
    <form
      className={styles["catalogue-filter-menu"]}
      onSubmit={() => console.log("Filter Form Submitted")}
    >
      <h2 className={styles["catalogue-filter-menu__title"]}>Card Type</h2>
      <div className={styles["catalogue-filter-menu__btns"]}>
        <CheckBox id="monster-card" name="monsters" label="Monsters" />
        <CheckBox id="spell-card" name="spells" label="Spells" />
        <CheckBox id="trap-card" name="traps" label="Traps" />
      </div>
      <h2 className={styles["catalogue-filter-menu__title"]}>Monsters</h2>
      <h3 className={styles["catalogue-filter-menu__title--sub"]}>
        Monster Type
      </h3>
      <div className={styles["catalogue-filter-menu__btns"]}>
        <CheckBox id="normal-monster" name="normal-monsters" label="Normal" />
        <CheckBox id="effect-monster" name="effect-monsters" label="Effect" />
        <CheckBox id="ritual-monster" name="ritual-monsters" label="Ritual" />
        <CheckBox id="fusion-monster" name="fusion-monsters" label="Fusion" />
        <CheckBox
          id="synchro-monster"
          name="synchro-monsters"
          label="Synchro"
        />
        <CheckBox id="xyz-monster" name="xyz-monsters" label="XYZ" />
        <CheckBox
          id="pendulum-monster"
          name="pendulum-monsters"
          label="Pendulum"
        />
        <CheckBox id="link-monster" name="link-monsters" label="Link" />
        <CheckBox id="token-monster" name="token-monsters" label="Token" />
      </div>
      <h3 className={styles["catalogue-filter-menu__title--sub"]}>
        Monster Race
      </h3>
      <div className={styles["catalogue-filter-menu__btns"]}>
        <CheckBox id="aqua-monster-card" name="aqua-monsters" label="Aqua" />
        <CheckBox id="beast-monster-card" name="beast-monsters" label="Beast" />
        <CheckBox
          id="beast-warrior-monster-card"
          name="beast-warrior-monsters"
          label="Beast Warrior"
        />
        <CheckBox
          id="cyberse-monster-card"
          name="cyberse-monsters"
          label="Cyberse"
        />
        <CheckBox
          id="dinosaur-monster-card"
          name="dinosaur-monsters"
          label="Dinosaur"
        />
        <CheckBox
          id="divine-beast-monster-card"
          name="divine-beasts"
          label="Divine Beast"
        />
        <CheckBox
          id="dragon-monster-card"
          name="dragon-monsters"
          label="Dragon"
        />
        <CheckBox id="fairy-monster-card" name="fairy-monsters" label="Fairy" />
        <CheckBox id="fiend-monster-card" name="fiend-monsters" label="Fiend" />
        <CheckBox id="fish-monster-card" name="fish-monsters" label="Fish" />
        <CheckBox
          id="insect-monster-card"
          name="insect-monsters"
          label="Insect"
        />
        <CheckBox
          id="machine-monster-card"
          name="machine-monsters"
          label="Machine"
        />
        <CheckBox id="plant-monster-card" name="plant-monsters" label="Plant" />
        <CheckBox
          id="psychic-monster-card"
          name="psychic-monsters"
          label="Psychic"
        />
        <CheckBox id="pyro-monster-card" name="pyro-monsters" label="Pyro" />
        <CheckBox
          id="reptile-monster-card"
          name="reptile-monsters"
          label="Reptile"
        />
        <CheckBox id="rock-monster-card" name="rock-monsters" label="Rock" />
        <CheckBox
          id="sea-serpent-monster-card"
          name="sea-serpent-monsters"
          label="Sea Serpent"
        />
        <CheckBox
          id="spellcaster-monster-card"
          name="spellcaster-monsters"
          label="Spellcaster"
        />
        <CheckBox
          id="thunder-monster-card"
          name="thunder-monsters"
          label="Thunder"
        />
        <CheckBox
          id="warrior-monster-card"
          name="warrior-monsters"
          label="Warrior"
        />
        <CheckBox
          id="winged-beast-monster-card"
          name="winged-beast-monsters"
          label="Winged Beast"
        />
        <CheckBox id="wyrm-monster-card" name="wyrm-monsters" label="Wyrm" />
        <CheckBox
          id="zombie-monster-card"
          name="zombie-monsters"
          label="Zombie"
        />
      </div>
    </form>
  );
};

export default CatalogueFilterMenu;
