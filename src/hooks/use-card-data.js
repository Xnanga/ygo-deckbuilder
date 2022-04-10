import { useReducer, useEffect } from "react";

const noCardDataStateChange = (state) => {
  return {
    allCardData: state.allCardData,
    catalogueCardData: state.catalogueCardData,
    fifteenCardDataChunk: state.fifteenCardDataChunk,
    totalPaginationPages: state.totalPaginationPages,
    currentPaginationpage: state.currentPaginationpage,
    activeFilters: state.activeFilters,
    bookmarkedCardsData: state.bookmarkedCardsData,
    focusedCard: state.focusedCard,
    activeTab: state.activeTab,
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
    focusedCard: state.focusedCard,
    activeTab: state.activeTab,
  };
};

const removeOneCard = (cardToRemove, cardData) => {
  const updatedCardData = cardData.filter((card) => {
    return card.id !== cardToRemove.id;
  });
  return updatedCardData;
};

const getFifteenCardChunk = (data, plusMinus, index) => {
  if (plusMinus === "plus") {
    return data.slice(index + 1, index + 16);
  }
  if (plusMinus === "minus") {
    return data.slice(index - 15, index);
  }
};

const updateBookmarkedCards = (
  state,
  bookmarkData,
  catalogueCards,
  fifteenCards
) => {
  const bookmarksTabActive = state.activeTab === "bookmarks";

  return {
    allCardData: state.allCardData,
    catalogueCardData: bookmarksTabActive
      ? catalogueCards
      : state.catalogueCardData,
    fifteenCardDataChunk: bookmarksTabActive
      ? fifteenCards
      : state.fifteenCardDataChunk,
    totalPaginationPages: state.totalPaginationPages,
    currentPaginationpage: state.currentPaginationpage,
    activeFilters: state.activeFilters,
    bookmarkedCardsData: bookmarkData,
    focusedCard: state.focusedCard,
    activeTab: state.activeTab,
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
      focusedCard: action.data[0],
      activeTab: "catalogue",
    };
  }

  // New set of catalogue card data
  if (action.type === "updateCatalogueCardData") {
    const firstFifteenCards = action.data.slice(0, 15);
    const requiredPages = Math.ceil(action.data.length / 15);
    const newTab = action.tab ? action.tab : state.activeTab;

    return {
      allCardData: state.allCardData,
      catalogueCardData: action.data,
      fifteenCardDataChunk: firstFifteenCards,
      totalPaginationPages: requiredPages,
      currentPaginationpage: 1,
      bookmarkedCardsData: state.bookmarkedCardsData,
      focusedCard: state.focusedCard,
      activeTab: newTab,
    };
  }

  // Show new 15 card chunk when moving one page forward
  if (action.type === "nextFifteenCardDataChunk") {
    // If on last pagination page, no state changes
    if (state.currentPaginationpage === state.totalPaginationPages) {
      return noCardDataStateChange(state);
    }

    const fifteenCardLastIndexID = state.fifteenCardDataChunk[14]?.id;
    const fifteenthCardIndexInAllCardData = state.catalogueCardData.findIndex(
      (card) => card.id === fifteenCardLastIndexID
    );

    const nextFifteenCards = getFifteenCardChunk(
      state.catalogueCardData,
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
    const firstCardIndexInAllCardData = state.catalogueCardData.findIndex(
      (card) => card.id === firstCardIndexID
    );
    const previousFifteenCards = getFifteenCardChunk(
      state.catalogueCardData,
      "minus",
      firstCardIndexInAllCardData
    );

    if (previousFifteenCards.length < 15) {
      return noCardDataStateChange(state);
    }

    return paginationStateChange(state, "minus", previousFifteenCards);
  }

  // Update focusedCard
  if (action.type === "updateFocusedCard") {
    return {
      allCardData: state.allCardData,
      catalogueCardData: state.catalogueCardData,
      fifteenCardDataChunk: state.fifteenCardDataChunk,
      totalPaginationPages: state.totalPaginationPages,
      currentPaginationpage: state.currentPaginationpage,
      activeFilters: state.activeFilters,
      bookmarkedCardsData: state.bookmarkedCardsData,
      focusedCard: action.data,
      activeTab: state.activeTab,
    };
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
      const updatedBookmarks = removeOneCard(action.data, currentBookmarks);
      if (state.activeTab === "catalogue")
        return updateBookmarkedCards(state, updatedBookmarks);

      const currentCatalogueCards = state.catalogueCardData.slice();
      const updatedCatalogueCards = removeOneCard(
        action.data,
        currentCatalogueCards
      );

      const requiredPages = Math.ceil(updatedCatalogueCards.length / 15);
      let currentPage = state.currentPaginationpage;

      const decreaseCurrentPageNumber = () => {
        if (currentPage > requiredPages) {
          currentPage--;
          decreaseCurrentPageNumber();
        } else {
          return currentPage;
        }
      };

      decreaseCurrentPageNumber();

      const indexForNewFifteenCards = (currentPage - 1) * 15 - 1;
      const newFifteenCards = getFifteenCardChunk(
        updatedCatalogueCards,
        "plus",
        indexForNewFifteenCards
      );

      return {
        allCardData: state.allCardData,
        catalogueCardData: updatedCatalogueCards,
        fifteenCardDataChunk: newFifteenCards,
        totalPaginationPages: requiredPages,
        currentPaginationpage: currentPage,
        activeFilters: state.activeFilters,
        bookmarkedCardsData: updatedBookmarks,
        focusedCard: action.data,
        activeTab: state.activeTab,
      };
    }
  }

  // Apply card filters
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

  if (action.type === "switchTab") {
    if (action.data === "catalogue") {
      return {
        allCardData: state.allCardData,
        catalogueCardData: state.catalogueCardData,
        fifteenCardDataChunk: state.fifteenCardDataChunk,
        totalPaginationPages: state.totalPaginationPages,
        currentPaginationpage: state.currentPaginationpage,
        activeFilters: state.activeFilters,
        bookmarkedCardsData: state.bookmarkedCardsData,
        focusedCard: state.focusedCard,
        activeTab: action.data,
      };
    }

    if (action.data === "bookmarks") {
      return {
        allCardData: state.allCardData,
        catalogueCardData: state.bookmarkedCardsData,
        fifteenCardDataChunk: state.fifteenCardDataChunk,
        totalPaginationPages: state.totalPaginationPages,
        currentPaginationpage: state.currentPaginationpage,
        activeFilters: state.activeFilters,
        bookmarkedCardsData: state.bookmarkedCardsData,
        focusedCard: state.focusedCard,
        activeTab: action.data,
      };
    }
  }
};

const useCardData = () => {
  const [cardData, dispatchCardData] = useReducer(cardDataReducer, {
    allCardData: [],
    catalogueCardData: [],
    fifteenCardDataChunk: [],
    totalPaginationPages: 0,
    currentPaginationpage: 0,
    activeFilters: {},
    bookmarkedCardsData: [],
    focusedCard: {},
    activeTab: "catalogue",
  });

  // Get bookmarks from LS on first render
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
  }, []);

  // Set bookmarks in LS when bookmarks updated
  useEffect(() => {
    const stringifiedBookmarkData = JSON.stringify(
      cardData.bookmarkedCardsData
    );
    localStorage.setItem("cardBookmarks", stringifiedBookmarkData);
  }, [cardData.bookmarkedCardsData]);

  return [cardData, dispatchCardData];
};

export default useCardData;
