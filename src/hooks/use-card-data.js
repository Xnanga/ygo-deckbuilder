import { useReducer, useEffect } from "react";

const noCardDataStateChange = (state) => {
  return {
    allCardData: state.allCardData,
    searchedCardData: state.searchedCardData,
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
    searchedCardData: state.searchedCardData,
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
    searchedCardData: state.searchedCardData,
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
      searchedCardData: [],
      catalogueCardData: action.data,
      fifteenCardDataChunk: firstFifteenCards,
      totalPaginationPages: requiredPages,
      currentPaginationpage: 1,
      bookmarkedCardsData: state.bookmarkedCardsData,
      focusedCard: action.data[0],
      activeTab: "catalogue",
    };
  }

  // Reset all data
  if (action.type === "resetCardData") {
    const firstFifteenCards = state.allCardData.slice(0, 15);
    const requiredPages = Math.ceil(state.allCardData.length / 15);

    return {
      allCardData: state.allCardData,
      searchedCardData: [],
      catalogueCardData: state.allCardData,
      fifteenCardDataChunk: firstFifteenCards,
      totalPaginationPages: requiredPages,
      currentPaginationpage: 1,
      activeFilters: state.activeFilters,
      bookmarkedCardsData: state.bookmarkedCardsData,
      focusedCard: state.focusedCard,
      activeTab: state.activeTab,
    };
  }

  if (action.type === "returnToSearchedData") {
    const dataToDisplay =
      state.searchedCardData.length > 0
        ? state.searchedCardData
        : state.allCardData;
    const firstFifteenCards = dataToDisplay.slice(0, 15);
    const requiredPages = Math.ceil(dataToDisplay.length / 15);

    return {
      allCardData: state.allCardData,
      searchedCardData: state.searchedCardData,
      catalogueCardData: dataToDisplay,
      fifteenCardDataChunk: firstFifteenCards,
      totalPaginationPages: requiredPages,
      currentPaginationpage: 1,
      activeFilters: [],
      bookmarkedCardsData: state.bookmarkedCardsData,
      focusedCard: state.focusedCard,
      activeTab: state.activeTab,
    };
  }

  // New set of catalogue card data
  if (action.type === "updateCatalogueCardData") {
    if (action.method === "cardSearch") {
      const firstFifteenCards = action.data.slice(0, 15);
      const requiredPages = Math.ceil(action.data.length / 15);

      return {
        allCardData: state.allCardData,
        searchedCardData: action.data,
        catalogueCardData: action.data,
        fifteenCardDataChunk: firstFifteenCards,
        totalPaginationPages: requiredPages,
        currentPaginationpage: 1,
        bookmarkedCardsData: state.bookmarkedCardsData,
        focusedCard: state.focusedCard,
        activeTab: state.activeTab,
      };
    }

    if (action.method === "tabChange") {
      let data =
        action.tab === "catalogue"
          ? state.searchedCardData
          : state.bookmarkedCardsData;
      if (data.length < 1) data = state.allCardData;
      const firstFifteenCards = data.slice(0, 15);
      const requiredPages = Math.ceil(data.length / 15);

      return {
        allCardData: state.allCardData,
        searchedCardData: state.searchedCardData,
        catalogueCardData: data,
        fifteenCardDataChunk: firstFifteenCards,
        totalPaginationPages: requiredPages,
        currentPaginationpage: 1,
        bookmarkedCardsData: state.bookmarkedCardsData,
        focusedCard: state.focusedCard,
        activeTab: action.tab,
      };
    }
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
      searchedCardData: state.searchedCardData,
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
        searchedCardData: state.searchedCardData,
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
    const filterMapData = action.data;
    let filteredCardData;
    state.searchedCardData.length < 1
      ? (filteredCardData = state.allCardData.slice())
      : (filteredCardData = state.searchedCardData.slice());

    // console.log(action.data);

    action.data.forEach((val, key) => {
      filteredCardData = filteredCardData.filter((card) => {
        return card[key].toString().toLowerCase().includes(val);
      });
    });

    const firstFifteenCards = filteredCardData.slice(0, 15);
    const requiredPages = Math.ceil(filteredCardData.length / 15);

    return {
      allCardData: state.allCardData,
      searchedCardData: state.searchedCardData,
      catalogueCardData: filteredCardData,
      fifteenCardDataChunk: firstFifteenCards,
      totalPaginationPages: requiredPages,
      currentPaginationpage: 1,
      activeFilters: filterMapData,
      bookmarkedCardsData: state.bookmarkedCardsData,
      focusedCard: state.focusedCard,
      activeTab: state.activeTab,
    };
  }

  // Sort current cards

  // atk
  // def
  // level
  // rank
  // link value

  // Switch tab
  if (action.type === "switchTab") {
    console.log(state.searchedCardData);
    if (action.data === "catalogue") {
      return {
        allCardData: state.allCardData,
        searchedCardData: state.searchedCardData,
        catalogueCardData: state.searchedCardData,
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
        searchedCardData: state.searchedCardData,
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
    searchedCardData: [],
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
