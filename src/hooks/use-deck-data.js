import { useReducer } from "react";

const noDeckDataStateChange = (state) => {
  return {
    mainDeckCards: state.mainDeckCards,
    mainDeckCardCount: state.mainDeckCardCount,
    extraDeckCards: state.extraDeckCards,
    extraDeckCardCount: state.extraDeckCardCount,
  };
};

const deckDataReducer = (state, action) => {
  const determineDeckToUpdate = (cardType) => {
    if (
      cardType.includes("Fusion") ||
      cardType.includes("Synchro") ||
      cardType.includes("XYZ") ||
      cardType.includes("Link")
    ) {
      return "extra";
    } else {
      return "main";
    }
  };

  if (action.type === "updateDeck") {
    // Determine deck to update and prepare relevant data
    const deckToUpdate = determineDeckToUpdate(action.data.type);
    const cardsRequiringUpdate =
      deckToUpdate === "main" ? state.mainDeckCards : state.extraDeckCards;
    const allCurrentCards = cardsRequiringUpdate.slice();
    const mainDeckCountChange = deckToUpdate === "main" ? 1 : 0;
    const extraDeckCountChange = deckToUpdate === "extra" ? 1 : 0;

    // Add cards
    if (action.update === "add") {
      allCurrentCards.push(action.data);

      return {
        mainDeckCards:
          deckToUpdate === "main" ? allCurrentCards : state.mainDeckCards,
        mainDeckCardCount: state.mainDeckCardCount + mainDeckCountChange,
        extraDeckCards:
          deckToUpdate === "extra" ? allCurrentCards : state.extraDeckCards,
        extraDeckCardCount: state.extraDeckCardCount + extraDeckCountChange,
      };
    }

    // Remove cards
    if (action.update === "remove") {
      const cardToRemoveIndex = allCurrentCards.findIndex(
        (card) => card.id === action.data.id
      );
      if (cardToRemoveIndex === -1) {
        return noDeckDataStateChange(state);
      }

      allCurrentCards.splice(cardToRemoveIndex, 1);

      return {
        mainDeckCards:
          deckToUpdate === "main" ? allCurrentCards : state.mainDeckCards,
        mainDeckCardCount: state.mainDeckCardCount - mainDeckCountChange,
        extraDeckCards:
          deckToUpdate === "extra" ? allCurrentCards : state.extraDeckCards,
        extraDeckCardCount: state.extraDeckCardCount - extraDeckCountChange,
      };
    }
  }
};

const useDeckData = () => {
  const [deckData, dispatchDeckData] = useReducer(deckDataReducer, {
    mainDeckCards: [],
    mainDeckCardCount: 0,
    extraDeckCards: [],
    extraDeckCardCount: 0,
  });

  // mainDeck, setMainDeck
  // extraDeck, setExtraDeck
  // Addcard
  // Remove card
  // Limit copies to 3
  // Prevent fusions, synchros, XYZs, and Links from entering Main Deck
  // Prevent regular monsters, spells, traps from entering extra deck
  // Sort cards in each deck by name and type
  // Count number of cards (X/60 for Main) (X/15 for Extra)
  // Allow adding/removing via cardProfile buttons
  // Allow adding/removing by dragging

  return [deckData, dispatchDeckData];
};

export default useDeckData;
