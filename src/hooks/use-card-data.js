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
  if (state.activeTab === "bookmarks") {
    return {
      allCardData: state.allCardData,
      searchedCardData: state.searchedCardData,
      catalogueCardData: catalogueCards,
      fifteenCardDataChunk: fifteenCards,
      totalPaginationPages: state.totalPaginationPages,
      currentPaginationpage: state.currentPaginationpage,
      activeFilters: state.activeFilters,
      bookmarkedCardsData: bookmarkData,
      focusedCard: state.focusedCard,
      activeTab: state.activeTab,
    };
  }

  if (state.activeTab === "catalogue") {
    return {
      allCardData: state.allCardData,
      searchedCardData: state.searchedCardData,
      catalogueCardData: state.catalogueCardData,
      fifteenCardDataChunk: state.fifteenCardDataChunk,
      totalPaginationPages: state.totalPaginationPages,
      currentPaginationpage: state.currentPaginationpage,
      activeFilters: state.activeFilters,
      bookmarkedCardsData: bookmarkData,
      focusedCard: state.focusedCard,
      activeTab: state.activeTab,
    };
  }
};

const handleFirstPageOfCards = (cardData) => {
  const firstFifteenCards = cardData.slice(0, 15);
  const requiredPages = Math.ceil(cardData.length / 15);

  return [firstFifteenCards, requiredPages];
};

const cardDataReducer = (state, action) => {
  // Get all card data on init
  if (action.type === "updateFullCardData") {
    const [firstFifteenCards, requiredPages] = handleFirstPageOfCards(
      action.data
    );

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
    const [firstFifteenCards, requiredPages] = handleFirstPageOfCards(
      state.allCardData
    );

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

  // Show searched card data
  if (action.type === "returnToSearchedData") {
    // Show all card data if no searched card data
    const dataToDisplay =
      state.searchedCardData.length > 0
        ? state.searchedCardData
        : state.allCardData;

    const [firstFifteenCards, requiredPages] =
      handleFirstPageOfCards(dataToDisplay);

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

  // Create new set of catalogue card data
  if (action.type === "updateCatalogueCardData") {
    // When a card is searched via text search
    if (action.method === "cardSearch") {
      const [firstFifteenCards, requiredPages] = handleFirstPageOfCards(
        action.data
      );

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

    // When active tab is changed in the catalogue
    if (action.method === "tabChange") {
      let data = [];
      if (action.tab === "catalogue") {
        data =
          state.searchedCardData.length > 0
            ? state.searchedCardData
            : state.allCardData;
      }
      if (action.tab === "bookmarks") {
        data = state.bookmarkedCardsData;
      }

      const [firstFifteenCards, requiredPages] = handleFirstPageOfCards(
        action.data
      );

      return {
        allCardData: state.allCardData,
        searchedCardData: state.searchedCardData,
        catalogueCardData: data,
        fifteenCardDataChunk: firstFifteenCards,
        totalPaginationPages: requiredPages,
        currentPaginationpage: 1,
        bookmarkedCardsData: state.bookmarkedCardsData,
        focusedCard: data[0],
        activeTab: action.tab,
      };
    }
  }

  // Show new 15 card chunk when moving one page forward
  if (action.type === "nextFifteenCardDataChunk") {
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

    // If no cards in previous fifteen chunk, no state changes
    if (previousFifteenCards.length < 15) {
      return noCardDataStateChange(state);
    }

    return paginationStateChange(state, "minus", previousFifteenCards);
  }

  // Update card shown in card profile
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

  // Update bookmarked cards
  if (action.type === "updateBookmarkedCards") {
    // Retrieve bookmarked card data from LS
    if (action.update === "getLocalStorage") {
      const sourcedBookmarkData = action.data;

      return updateBookmarkedCards(state, sourcedBookmarkData);
    }

    // When a bookmark is added
    if (action.update === "add") {
      const bookmarkedCards = state.bookmarkedCardsData.slice();
      bookmarkedCards.push(action.data);
      let indexForNewFifteenCards;

      if (bookmarkedCards.length > 1) {
        indexForNewFifteenCards = (state.currentPaginationpage - 1) * 15 - 1;
      } else {
        indexForNewFifteenCards = -1;
      }

      const newFifteenCards = getFifteenCardChunk(
        bookmarkedCards,
        "plus",
        indexForNewFifteenCards
      );

      return updateBookmarkedCards(
        state,
        bookmarkedCards,
        bookmarkedCards,
        newFifteenCards
      );
    }

    // When a bookmark is removed
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
        focusedCard: state.focusedCard,
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

    action.data.forEach((val, key) => {
      filteredCardData = filteredCardData.filter((card) => {
        return card[key].toString().toLowerCase().includes(val);
      });
    });

    const [firstFifteenCards, requiredPages] =
      handleFirstPageOfCards(filteredCardData);

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

  // Apply card sorting
  if (action.type === "applyCardSorting") {
    const cardDataToSort = state.catalogueCardData.slice();
    const attribute = action.attribute;
    let sortedCards = [];

    if (action.direction === "ascending") {
      sortedCards = cardDataToSort.sort((a, z) => {
        return (a[attribute] || 0) - (z[attribute] || 0);
      });
    }

    if (action.direction === "descending") {
      sortedCards = cardDataToSort.sort((a, z) => {
        return (z[attribute] || 0) - (a[attribute] || 0);
      });
    }

    const firstFifteenCards = sortedCards.slice(0, 15);

    return {
      allCardData: state.allCardData,
      searchedCardData: state.searchedCardData,
      catalogueCardData: sortedCards,
      fifteenCardDataChunk: firstFifteenCards,
      totalPaginationPages: state.totalPaginationPages,
      currentPaginationpage: 1,
      activeFilters: state.activeFilters,
      bookmarkedCardsData: state.bookmarkedCardsData,
      focusedCard: state.focusedCard,
      activeTab: state.activeTab,
    };
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
