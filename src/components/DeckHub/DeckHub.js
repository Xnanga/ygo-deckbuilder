import styles from "./DeckHub.module.css";

import TitleStripBanner from "../UI/TitleStripBanner";
import DeckHubGallery from "./DeckHubGallery";

const DeckHub = (props) => {
  return (
    <section className={styles["deck-hub"]}>
      <div className={styles["deck-hub__main-deck-section"]}>
        <TitleStripBanner
          title="Main Deck"
          secondarySpan={`${props.deckData.mainDeckCardCount}/60`}
        />
        <DeckHubGallery currentCards={props.deckData?.mainDeckCards} />
      </div>
      <div className={styles["deck-hub__extra-deck-section"]}>
        <TitleStripBanner
          title="Extra Deck"
          secondarySpan={`${props.deckData.extraDeckCardCount}/15`}
        />
        <DeckHubGallery currentCards={props.deckData?.extraDeckCards} />
      </div>
    </section>
  );
};

export default DeckHub;
