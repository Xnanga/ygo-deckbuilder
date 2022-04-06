import React, { useState, useReducer } from "react";

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

const cardDataReducer = (state, action) => {
  // New set of searched card data
  if (action.type === "updateFullCardData") {
    const firstFifteenCards = action.data.slice(0, 15);
    const requiredPages = Math.ceil(action.data.length / 15);

    return {
      allCardData: action.data,
      fifteenCardDataChunk: firstFifteenCards,
      totalPaginationPages: requiredPages,
      currentPaginationpage: 1,
    };
  }

  // Show new 15 card chunk when moving one page forward
  if (action.type === "nextFifteenCardDataChunk") {
    // If on last pagination page, no state changes
    if (state.currentPaginationpage === state.totalPaginationPages) {
      return {
        allCardData: state.allCardData,
        fifteenCardDataChunk: state.fifteenCardDataChunk,
        totalPaginationPages: state.totalPaginationPages,
        currentPaginationpage: state.currentPaginationpage,
        activeFilters: state.activeFilters,
      };
    }

    const fifteenCardLastIndexID = state.fifteenCardDataChunk[14]?.id;
    const fifteenthCardIndexInAllCardData = state.allCardData.findIndex(
      (card) => card.id === fifteenCardLastIndexID
    );

    const nextFifteenCards = state.allCardData.slice(
      fifteenthCardIndexInAllCardData + 1,
      fifteenthCardIndexInAllCardData + 16
    );

    // If no cards in newest fifteen chunk, no state changes
    if (nextFifteenCards.length < 1) {
      return {
        allCardData: state.allCardData,
        fifteenCardDataChunk: state.fifteenCardDataChunk,
        totalPaginationPages: state.totalPaginationPages,
        currentPaginationpage: state.currentPaginationpage,
        activeFilters: state.activeFilters,
      };
    }

    return {
      allCardData: state.allCardData,
      fifteenCardDataChunk: nextFifteenCards,
      totalPaginationPages: state.totalPaginationPages,
      currentPaginationpage: state.currentPaginationpage + 1,
      activeFilters: state.activeFilters,
    };
  }

  // Show previous 15 card chunk when moving one page backwards
  if (action.type === "prevFifteenCardDataChunk") {
    const firstCardIndexID = state.fifteenCardDataChunk[0]?.id;
    const firstCardIndexInAllCardData = state.allCardData.findIndex(
      (card) => card.id === firstCardIndexID
    );
    const previousFifteenCards = state.allCardData.slice(
      firstCardIndexInAllCardData - 15,
      firstCardIndexInAllCardData
    );

    if (previousFifteenCards.length < 15) {
      return {
        allCardData: state.allCardData,
        fifteenCardDataChunk: state.fifteenCardDataChunk,
        totalPaginationPages: state.totalPaginationPages,
        currentPaginationpage: state.currentPaginationpage,
        activeFilters: state.activeFilters,
      };
    }

    return {
      allCardData: state.allCardData,
      fifteenCardDataChunk: previousFifteenCards,
      totalPaginationPages: state.totalPaginationPages,
      currentPaginationpage: state.currentPaginationpage - 1,
      activeFilters: state.activeFilters,
    };
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

    console.log(filteredCardData);

    return {
      allCardData: state.allCardData,
      fifteenCardDataChunk: state.fifteenCardDataChunk,
      totalPaginationPages: state.totalPaginationPages,
      currentPaginationpage: state.currentPaginationpage,
      activeFilters: state.activeFilters,
    };
  }
};

export const CardsContextProvider = (props) => {
  const [focusedCard, setFocusedCard] = useState({});
  const [modalVisible, setModalVisible] = useState(null);
  const [activeCardFilters, setActiveCardFilters] = useState({});

  const [cardData, dispatchCardData] = useReducer(cardDataReducer, {
    allCardData: [],
    fifteenCardDataChunk: [],
    totalPaginationPages: 0,
    currentPaginationpage: 0,
    activeFilters: {},
  });

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
