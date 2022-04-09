import { useEffect, useState } from "react";

import styles from "./CardCatalogue.module.css";

import TabMenu from "../UI/Menus/TabMenu";
import CatalogueTextSearch from "./CatalogueTextSearch";
import CardCatalogueActionButtons from "./CardCatalogueActionButtons";
import CardGallery from "./CardGallery";

import PaginationControls from "../UI/PaginationControls";

const CardCatalogue = (props) => {
  const [searchError, setSearchError] = useState(false);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");

  const activeTabHandler = (tabId) => {
    if (tabId === props.activeTab) return;

    if (tabId === "catalogue") {
      props.dispatchCardData({
        type: "updateCatalogueCardData",
        data: props.allCards,
        tab: tabId,
      });
    }

    if (tabId === "bookmarks") {
      props.dispatchCardData({
        type: "updateCatalogueCardData",
        data: props.bookmarkedCards,
        tab: tabId,
      });
    }
  };

  const tabMenuData = [
    {
      id: "catalogue",
      imgSrc: "/media/icons/briefcase-icon.png",
      imgAlt: "A briefcase icon",
      label: "Card List",
    },
    {
      id: "bookmarks",
      imgSrc: "/media/icons/bookmark-icon.png",
      imgAlt: "A bookmark icon",
      label: "Bookmarks",
    },
  ];

  const cardSearchHandler = (cardSearchQuery) => {
    const searchTerm = cardSearchQuery.toLowerCase();
    const allMatchingCardsData = props.allCards.filter((card) => {
      return card.name.toLowerCase().includes(searchTerm);
    });

    props.dispatchCardData({
      type: "updateCatalogueCardData",
      data: allMatchingCardsData,
    });

    setCurrentSearchTerm(cardSearchQuery);
  };

  const fetchCardData = async (endpParams) => {
    try {
      const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php${endpParams}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Request Failed!");
      const receivedObj = await res.json();
      props.dispatchCardData({
        type: "updateFullCardData",
        data: receivedObj.data,
      });
      setSearchError(false);
    } catch (error) {
      console.error(error);
      setSearchError(true);
    }
  };

  useEffect(() => {
    fetchCardData("");
  }, []);

  const cardList = (
    <>
      <CatalogueTextSearch
        inputValue={currentSearchTerm}
        cardSearchHandler={cardSearchHandler}
      />
      <div className={styles["card-catalogue__action-btns"]}>
        <CardCatalogueActionButtons dispatchCardData={props.dispatchCardData} />
      </div>
      <CardGallery
        dispatchCardData={props.dispatchCardData}
        currentCards={props.fifteenCards}
        searchErrorStatus={searchError}
      />
      <PaginationControls
        dispatchCardData={props.dispatchCardData}
        currentPage={props.currentPage}
        totalPages={props.totalPages}
      />
    </>
  );

  const bookmarks = (
    <>
      <CardGallery
        dispatchCardData={props.dispatchCardData}
        setFocusedCard={props.setFocusedCard}
        currentCards={props.fifteenCards}
      />
      <PaginationControls
        dispatchCardData={props.dispatchCardData}
        currentPage={props.currentPage}
        totalPages={props.totalPages}
      />
    </>
  );

  return (
    <section className={styles["card-catalogue"]}>
      <TabMenu
        listData={tabMenuData}
        activeTab={props.activeTab}
        activeTabHandler={activeTabHandler}
      />
      {props.activeTab === "catalogue" && cardList}
      {props.activeTab === "bookmarks" && bookmarks}
    </section>
  );
};

export default CardCatalogue;
