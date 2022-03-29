import styles from "./App.css";

import { CardsContextProvider } from "./Context/card-context";
import DeckBuilderMainLayout from "./components/UI/DeckBuilderMainLayout";
import CardProfile from "./components/CardProfile/CardProfile";
import DeckHub from "./components/DeckHub/DeckHub";
import CardCatalogue from "./components/CardCatalogue/CardCatalogue";

function App() {
  return (
    <CardsContextProvider>
      <div className="app">
        <DeckBuilderMainLayout>
          <CardProfile />
          <DeckHub />
          <CardCatalogue />
        </DeckBuilderMainLayout>
      </div>
    </CardsContextProvider>
  );
}

export default App;
