import { useReducer, useEffect } from "react";

const noDeckDataStateChange = (state) => {
  return {
    mainDeckCards: state.mainDeckCards,
    mainDeckCardCount: state.mainDeckCardCount,
    extraDeckCards: state.extraDeckCards,
    extraDeckCardCount: state.extraDeckCardCount,
  };
};

const resetAllDeckData = () => {
  return {
    mainDeckCards: [],
    mainDeckCardCount: 0,
    extraDeckCards: [],
    extraDeckCardCount: 0,
  };
};

const checkForMultipleCards = (cardData, card) => {
  const allMatchingCards = cardData.filter(
    (cardInList) => cardInList.id === card.id
  );
  return allMatchingCards.length;
};

const checkIfDeckIsFull = (mainDeckCardCount, extraDeckCardCount, deckType) => {
  if (deckType === "main") {
    if (mainDeckCardCount >= 60) return true;
    else return false;
  }
  if (deckType === "extra") {
    if (extraDeckCardCount >= 15) return true;
    else return false;
  }
};

const sortDeckById = (deckData) => {
  return deckData.sort((a, z) => a.id - z.id);
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
      if (
        checkIfDeckIsFull(
          state.mainDeckCardCount,
          state.extraDeckCardCount,
          deckToUpdate
        )
      ) {
        return noDeckDataStateChange(state);
      }
      if (checkForMultipleCards(allCurrentCards, action.data) >= 3) {
        return noDeckDataStateChange(state);
      }
      allCurrentCards.push(action.data);

      sortDeckById(allCurrentCards);

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
      if (checkForMultipleCards(allCurrentCards, action.data) <= 0) {
        return noDeckDataStateChange(state);
      }

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

  if (action.type === "getLocalStorage") {
    if (action.deckType === "mainDeck") {
      return {
        mainDeckCards: action.data,
        mainDeckCardCount: action.data.length,
        extraDeckCards: state.extraDeckCards,
        extraDeckCardCount: state.extraDeckCardCount,
      };
    }

    if (action.deckType === "extraDeck") {
      return {
        mainDeckCards: state.mainDeckCards,
        mainDeckCardCount: state.mainDeckCardCount,
        extraDeckCards: action.data,
        extraDeckCardCount: action.data.length,
      };
    }
  }

  if (action.type === "resetAllDeckData") {
    return resetAllDeckData();
  }
};

const useDeckData = () => {
  const [deckData, dispatchDeckData] = useReducer(deckDataReducer, {
    mainDeckCards: [],
    mainDeckCardCount: 0,
    extraDeckCards: [],
    extraDeckCardCount: 0,
  });

  // Get bookmarks from LS on first render
  useEffect(() => {
    const localStorageMainDeckData = localStorage.getItem("mainDeckCards");
    const localStorageExtraDeckData = localStorage.getItem("extraDeckCards");

    if (localStorageMainDeckData) {
      const parsedData = JSON.parse(localStorageMainDeckData);
      dispatchDeckData({
        type: "getLocalStorage",
        deckType: "mainDeck",
        data: parsedData,
      });
    }

    if (localStorageExtraDeckData) {
      const parsedData = JSON.parse(localStorageExtraDeckData);
      dispatchDeckData({
        type: "getLocalStorage",
        deckType: "extraDeck",
        data: parsedData,
      });
    }
  }, []);

  // Set bookmarks in LS when bookmarks updated
  useEffect(() => {
    const stringifiedMainDeckData = JSON.stringify(deckData.mainDeckCards);
    const stringifiedExtraDeckData = JSON.stringify(deckData.extraDeckCards);
    localStorage.setItem("mainDeckCards", stringifiedMainDeckData);
    localStorage.setItem("extraDeckCards", stringifiedExtraDeckData);
  }, [deckData.mainDeckCards, deckData.extraDeckCards]);

  // Allow adding/removing by dragging

  return [deckData, dispatchDeckData];
};

export default useDeckData;
