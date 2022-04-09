import styles from "./App.css";

import useCardData from "./hooks/use-card-data";
import DeckBuilderMainLayout from "./components/UI/DeckBuilderMainLayout";
import CardProfile from "./components/CardProfile/CardProfile";
import DeckHub from "./components/DeckHub/DeckHub";
import CardCatalogue from "./components/CardCatalogue/CardCatalogue";

function App() {
  const [cardData, dispatchCardData] = useCardData();

  return (
    <div className="app">
      <DeckBuilderMainLayout>
        <CardProfile
          focusedCard={cardData.focusedCard}
          bookmarkedCards={cardData.bookmarkedCardsData}
          dispatchCardData={dispatchCardData}
        />
        <DeckHub />
        <CardCatalogue
          allCards={cardData.allCardData}
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
