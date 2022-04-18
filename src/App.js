import styles from "./App.css";

import useCardData from "./hooks/use-card-data";
import DeckBuilderMainLayout from "./components/UI/DeckBuilderMainLayout";
import CardProfile from "./components/CardProfile/CardProfile";
import DeckHub from "./components/DeckHub/DeckHub";
import CardCatalogue from "./components/CardCatalogue/CardCatalogue";
import useDeckData from "./hooks/use-deck-data";

function App() {
  const [cardData, dispatchCardData] = useCardData();
  const [deckData, dispatchDeckData] = useDeckData();

  return (
    <div className="app">
      <DeckBuilderMainLayout>
        <CardProfile
          focusedCard={cardData.focusedCard}
          bookmarkedCards={cardData.bookmarkedCardsData}
          dispatchCardData={dispatchCardData}
          dispatchDeckData={dispatchDeckData}
        />
        <DeckHub deckData={deckData} dispatchDeckData={dispatchDeckData} />
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
        />
      </DeckBuilderMainLayout>
    </div>
  );
}

export default App;
