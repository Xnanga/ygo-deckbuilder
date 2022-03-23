import styles from "./App.css";

import useHTTP from "./hooks/use-http";

import DeckBuilderMainLayout from "./components/UI/DeckBuilderMainLayout";
import CardProfile from "./components/CardProfile/CardProfile";
import DeckHub from "./components/DeckHub/DeckHub";
import CardCatalogue from "./components/CardCatalogue/CardCatalogue";

function App() {
  // const { data, loading, error } = useHTTP({
  //   url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Doomking Balerdroch`,
  // });

  // console.log(data);

  return (
    <div className="app">
      <DeckBuilderMainLayout>
        <CardProfile />
        <DeckHub />
        <CardCatalogue />
      </DeckBuilderMainLayout>
    </div>
  );
}

export default App;
