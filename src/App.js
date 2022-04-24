import { useState } from "react";

import styles from "./App.css";

import useCardData from "./hooks/use-card-data";
import HeaderBar from "./components/UI/HeaderBar";
import DeckBuilderMainLayout from "./components/UI/DeckBuilderMainLayout";
import CardProfile from "./components/CardProfile/CardProfile";
import DeckHub from "./components/DeckHub/DeckHub";
import CardCatalogue from "./components/CardCatalogue/CardCatalogue";
import useDeckData from "./hooks/use-deck-data";

import useZipcelx from "./hooks/use-zipcelx";

function App() {
  const [cardData, dispatchCardData] = useCardData();
  const [deckData, dispatchDeckData] = useDeckData();
  const [cardProfileModalVisible, setCardProfileModalVisible] = useState(false);
  const [, generateXlsx] = useZipcelx();

  const exportDeckDataHandler = () => {
    generateXlsx(deckData);
  };

  const cardProfileModalVisibilityHandler = (bool) => {
    setCardProfileModalVisible(bool);
  };

  return (
    <div className="app">
      <DeckBuilderMainLayout>
        <HeaderBar
          dispatchDeckData={dispatchDeckData}
          exportDeckDataHandler={exportDeckDataHandler}
        />
        <CardProfile
          focusedCard={cardData.focusedCard}
          bookmarkedCards={cardData.bookmarkedCardsData}
          mainDeckData={deckData.mainDeckCards}
          extraDeckData={deckData.extraDeckCards}
          dispatchCardData={dispatchCardData}
          dispatchDeckData={dispatchDeckData}
          modalVisible={cardProfileModalVisible}
          cardProfileModalVisibilityHandler={cardProfileModalVisibilityHandler}
        />
        <DeckHub
          deckData={deckData}
          dispatchDeckData={dispatchDeckData}
          dispatchCardData={dispatchCardData}
          cardProfileModalVisibilityHandler={cardProfileModalVisibilityHandler}
        />
        <CardCatalogue
          allCards={cardData.allCardData}
          searchedCards={cardData.searchedCardData}
          focusedCard={cardData.focusedCard}
          setFocusedCard={cardData.setFocusedCard}
          bookmarkedCards={cardData.bookmarkedCardsData}
          fifteenCards={cardData.fifteenCardDataChunk}
          dispatchCardData={dispatchCardData}
          currentPage={cardData.currentPaginationpage}
          totalPages={cardData.totalPaginationPages}
          activeTab={cardData.activeTab}
          cardProfileModalVisibilityHandler={cardProfileModalVisibilityHandler}
        />
      </DeckBuilderMainLayout>
    </div>
  );
}

export default App;
