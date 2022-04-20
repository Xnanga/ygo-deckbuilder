import { useState } from "react";

import styles from "./DeckHub.module.css";

import TitleStripBanner from "../UI/TitleStripBanner";
import TabMenu from "../UI/Menus/TabMenu.js";
import DeckHubGallery from "./DeckHubGallery";
import useScreenWidth from "../../hooks/use-screen-width";

const DeckHub = (props) => {
  const [activeTab, setActiveTab] = useState("mainDeck");
  const screenWidth = useScreenWidth(1500);

  const tabMenuData = [
    {
      id: "mainDeck",
      label: "Main Deck",
      extraSpan: `${props.deckData.mainDeckCardCount}/60`,
    },
    {
      id: "extraDeck",
      label: "Extra Deck",
      extraSpan: `${props.deckData.extraDeckCardCount}/15`,
    },
  ];

  const activeTabHandler = (tabId) => {
    if (tabId === activeTab) return;

    if (tabId === "mainDeck") {
      setActiveTab("mainDeck");
    }

    if (tabId === "extraDeck") {
      setActiveTab("extraDeck");
    }
  };

  const largeWidthView = (
    <section className={styles["deck-hub"]}>
      <div className={styles["deck-hub__main-deck-section"]}>
        <TitleStripBanner
          title="Main Deck"
          secondarySpan={`${props.deckData.mainDeckCardCount}/60`}
        />
        <DeckHubGallery
          currentCards={props.deckData?.mainDeckCards}
          dispatchCardData={props.dispatchCardData}
        />
      </div>
      <div className={styles["deck-hub__extra-deck-section"]}>
        <TitleStripBanner
          title="Extra Deck"
          secondarySpan={`${props.deckData.extraDeckCardCount}/15`}
        />
        <DeckHubGallery
          currentCards={props.deckData?.extraDeckCards}
          dispatchCardData={props.dispatchCardData}
        />
      </div>
    </section>
  );

  const smallWidthMainDeckGallery = (
    <DeckHubGallery
      currentCards={props.deckData?.mainDeckCards}
      dispatchCardData={props.dispatchCardData}
    />
  );

  const smallWidthExtraDeckGallery = (
    <DeckHubGallery
      currentCards={props.deckData?.extraDeckCards}
      dispatchCardData={props.dispatchCardData}
    />
  );

  const smallWidthView = (
    <section className={styles["deck-hub"]}>
      <TabMenu
        listData={tabMenuData}
        activeTab={activeTab}
        activeTabHandler={activeTabHandler}
      />
      {activeTab === "mainDeck" && smallWidthMainDeckGallery}
      {activeTab === "extraDeck" && smallWidthExtraDeckGallery}
    </section>
  );

  return <>{screenWidth ? largeWidthView : smallWidthView}</>;
};

export default DeckHub;
