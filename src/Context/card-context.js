// Deprecated, switched to prop drilling and custom hooks

import React, { useState, useReducer, useEffect } from "react";

const CardsContext = React.createContext({
  focusedCard: {},
  modalVisible: "",
  cardData: [],
  activeCardFilters: {},
  setFocusedCard: () => {},
  setModalVisible: () => {},
  dispatchCardData: () => {},
  setActiveCardFilters: () => {},
});

const noCardDataStateChange = (state) => {
  return {
    allCardData: state.allCardData,
    catalogueCardData: state.catalogueCardData,
    fifteenCardDataChunk: state.fifteenCardDataChunk,
    totalPaginationPages: state.totalPaginationPages,
    currentPaginationpage: state.currentPaginationpage,
    activeFilters: state.activeFilters,
    bookmarkedCardsData: state.bookmarkedCardsData,
  };
};

const paginationStateChange = (state, plusMinus, fifteenCards) => {
  let paginationChange;
  if (plusMinus === "plus") paginationChange = state.currentPaginationpage + 1;
  if (plusMinus === "minus") paginationChange = state.currentPaginationpage - 1;
  return {
    allCardData: state.allCardData,
    catalogueCardData: state.catalogueCardData,
    fifteenCardDataChunk: fifteenCards,
    totalPaginationPages: state.totalPaginationPages,
    currentPaginationpage: paginationChange,
    activeFilters: state.activeFilters,
    bookmarkedCardsData: state.bookmarkedCardsData,
  };
};

const getFifteenCardChunk = (data, plusMinus, index) => {
  if (plusMinus === "plus") {
    return data.slice(index + 1, index + 16);
  }
  if (plusMinus === "minus") {
    return data.slice(index - 15, index);
  }
};

const updateBookmarkedCards = (state, bookmarkData) => {
  return {
    allCardData: state.allCardData,
    catalogueCardData: state.catalogueCardData,
    fifteenCardDataChunk: state.fifteenCardDataChunk,
    totalPaginationPages: state.totalPaginationPages,
    currentPaginationpage: state.currentPaginationpage,
    activeFilters: state.activeFilters,
    bookmarkedCardsData: bookmarkData,
  };
};

const cardDataReducer = (state, action) => {
  // Get all card data on init
  if (action.type === "updateFullCardData") {
    const firstFifteenCards = action.data.slice(0, 15);
    const requiredPages = Math.ceil(action.data.length / 15);

    return {
      allCardData: action.data,
      catalogueCardData: action.data,
      fifteenCardDataChunk: firstFifteenCards,
      totalPaginationPages: requiredPages,
      currentPaginationpage: 1,
      bookmarkedCardsData: state.bookmarkedCardsData,
    };
  }

  // New set of catalogue card data
  if (action.type === "updateCatalogueCardData") {
    const firstFifteenCards = action.data.slice(0, 15);
    const requiredPages = Math.ceil(action.data.length / 15);

    return {
      allCardData: state.allCardData,
      catalogueCardData: action.data,
      fifteenCardDataChunk: firstFifteenCards,
      totalPaginationPages: requiredPages,
      currentPaginationpage: 1,
      bookmarkedCardsData: state.bookmarkedCardsData,
    };
  }

  // Show new 15 card chunk when moving one page forward
  if (action.type === "nextFifteenCardDataChunk") {
    // If on last pagination page, no state changes
    if (state.currentPaginationpage === state.totalPaginationPages) {
      return noCardDataStateChange(state);
    }

    const fifteenCardLastIndexID = state.fifteenCardDataChunk[14]?.id;
    const fifteenthCardIndexInAllCardData = state.allCardData.findIndex(
      (card) => card.id === fifteenCardLastIndexID
    );

    const nextFifteenCards = getFifteenCardChunk(
      state.allCardData,
      "plus",
      fifteenthCardIndexInAllCardData
    );

    // If no cards in newest fifteen chunk, no state changes
    if (nextFifteenCards.length < 1) {
      return noCardDataStateChange(state);
    }

    return paginationStateChange(state, "plus", nextFifteenCards);
  }

  // Show previous 15 card chunk when moving one page backwards
  if (action.type === "prevFifteenCardDataChunk") {
    const firstCardIndexID = state.fifteenCardDataChunk[0]?.id;
    const firstCardIndexInAllCardData = state.allCardData.findIndex(
      (card) => card.id === firstCardIndexID
    );
    const previousFifteenCards = getFifteenCardChunk(
      state.allCardData,
      "minus",
      firstCardIndexInAllCardData
    );

    if (previousFifteenCards.length < 15) {
      return noCardDataStateChange(state);
    }

    return paginationStateChange(state, "minus", previousFifteenCards);
  }

  // Update bookmarks
  if (action.type === "updateBookmarkedCards") {
    if (action.update === "getLocalStorage") {
      const sourcedBookmarkData = action.data;

      return updateBookmarkedCards(state, sourcedBookmarkData);
    }

    if (action.update === "add") {
      const bookmarkedCards = state.bookmarkedCardsData.slice();
      bookmarkedCards.push(action.data);

      return updateBookmarkedCards(state, bookmarkedCards);
    }

    if (action.update === "remove") {
      const currentBookmarks = state.bookmarkedCardsData.slice();
      const updatedBookmarks = currentBookmarks.filter(
        (card) => card.id !== action.data.id
      );

      return updateBookmarkedCards(state, updatedBookmarks);
    }
  }

  if (action.type === "applyCardFilters") {
    const currentCardData = state.allCardData.slice();
    let filteredCardData = [];

    // Key: cardType
    // Value: "trap-card"

    for (const key in action.data) {
      if (!action.data[key]) return;

      // Does this need done conditionally for all fields?
      currentCardData.forEach((card) => {
        console.log(`card.type:${card.type}`);
        console.log(`key.value:${action.data[key]}`);

        // Will names need to be changed to match things up?
        if (card.type.includes(action.data[key])) {
          filteredCardData.push(card);
        }
      });
    }

    return noCardDataStateChange(state);
  }
};

export const CardsContextProvider = (props) => {
  const [focusedCard, setFocusedCard] = useState({});
  const [modalVisible, setModalVisible] = useState(null);
  const [activeCardFilters, setActiveCardFilters] = useState({});

  const [cardData, dispatchCardData] = useReducer(cardDataReducer, {
    allCardData: [],
    catalogueCardData: [],
    fifteenCardDataChunk: [],
    totalPaginationPages: 0,
    currentPaginationpage: 0,
    activeFilters: {},
    bookmarkedCardsData: [],
  });

  useEffect(() => {
    const localStorageBookmarkData = localStorage.getItem("cardBookmarks");
    if (localStorageBookmarkData) {
      const parsedData = JSON.parse(localStorageBookmarkData);
      dispatchCardData({
        type: "updateBookmarkedCards",
        update: "getLocalStorage",
        data: parsedData,
      });
    }
    console.log("useEffect Fired");
  }, []);

  useEffect(() => {
    const stringifiedBookmarkData = JSON.stringify(
      cardData.bookmarkedCardsData
    );
    localStorage.setItem("cardBookmarks", stringifiedBookmarkData);
    console.log("useEffect Fired");
  }, [cardData.bookmarkedCardsData]);

  return (
    <CardsContext.Provider
      value={{
        focusedCard: focusedCard,
        modalVisible: modalVisible,
        cardData: cardData,
        activeCardFilters: activeCardFilters,
        setFocusedCard: setFocusedCard,
        setModalVisible: setModalVisible,
        dispatchCardData: dispatchCardData,
        setActiveCardFilters: setActiveCardFilters,
      }}
    >
      {props.children}
    </CardsContext.Provider>
  );
};

export default CardsContext;
