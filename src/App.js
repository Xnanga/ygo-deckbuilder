import styles from "./App.css";

import useCardData from "./hooks/use-card-data";
import HeaderBar from "./components/UI/HeaderBar";
import DeckBuilderMainLayout from "./components/UI/DeckBuilderMainLayout";
import CardProfile from "./components/CardProfile/CardProfile";
import DeckHub from "./components/DeckHub/DeckHub";
import CardCatalogue from "./components/CardCatalogue/CardCatalogue";
import useDeckData from "./hooks/use-deck-data";
import useScreenWidth from "./hooks/use-screen-width";
import AppLogo from "./components/UI/AppLogo";
import RectangularButton from "./components/UI/Buttons/RectangularButton";

function App() {
  const [cardData, dispatchCardData] = useCardData();
  const [deckData, dispatchDeckData] = useDeckData();
  const screenWidth = useScreenWidth(1500);

  return (
    <div className="app">
      <DeckBuilderMainLayout>
        <HeaderBar>
          <AppLogo
            imgSrc="/media/icons/ygo-logo.png"
            imgAlt="The Yu-Gi-Oh! Logo"
            optionalText="Deckbuilder"
          />
          <RectangularButton
            onButtonClick={() => console.log("Export Button Click")}
            imgSrc="/media/icons/sort-icon.png"
            imgAlt="A sort icon"
            buttonText="Export"
          />
        </HeaderBar>
        {screenWidth && (
          <CardProfile
            focusedCard={cardData.focusedCard}
            bookmarkedCards={cardData.bookmarkedCardsData}
            dispatchCardData={dispatchCardData}
            dispatchDeckData={dispatchDeckData}
          />
        )}
        <DeckHub
          deckData={deckData}
          dispatchDeckData={dispatchDeckData}
          dispatchCardData={dispatchCardData}
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
        />
      </DeckBuilderMainLayout>
    </div>
  );
}

export default App;
