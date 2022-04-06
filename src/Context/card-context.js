import React, { useState, useReducer } from "react";

const CardsContext = React.createContext({
  focusedCard: {},
  modalVisible: "",
  cardData: [],
  setFocusedCard: () => {},
  setModalVisible: () => {},
  dispatchCardData: () => {},
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
      };
    }

    return {
      allCardData: state.allCardData,
      fifteenCardDataChunk: nextFifteenCards,
      totalPaginationPages: state.totalPaginationPages,
      currentPaginationpage: state.currentPaginationpage + 1,
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
      };
    }

    return {
      allCardData: state.allCardData,
      fifteenCardDataChunk: previousFifteenCards,
      totalPaginationPages: state.totalPaginationPages,
      currentPaginationpage: state.currentPaginationpage - 1,
    };
  }
};

export const CardsContextProvider = (props) => {
  const [focusedCard, setFocusedCard] = useState({});
  const [modalVisible, setModalVisible] = useState(null);

  const [cardData, dispatchCardData] = useReducer(cardDataReducer, {
    allCardData: [],
    fifteenCardDataChunk: [],
    totalPaginationPages: 0,
    currentPaginationpage: 0,
  });

  return (
    <CardsContext.Provider
      value={{
        focusedCard: focusedCard,
        modalVisible: modalVisible,
        cardData: cardData,
        setFocusedCard: setFocusedCard,
        setModalVisible: setModalVisible,
        dispatchCardData: dispatchCardData,
      }}
    >
      {props.children}
    </CardsContext.Provider>
  );
};

export default CardsContext;
