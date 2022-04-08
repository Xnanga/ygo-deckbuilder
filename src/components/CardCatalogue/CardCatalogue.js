import { useEffect, useState, useContext } from "react";

import styles from "./CardCatalogue.module.css";

import TabMenu from "../UI/Menus/TabMenu";
import CatalogueTextSearch from "./CatalogueTextSearch";
import CardCatalogueActionButtons from "./CardCatalogueActionButtons";
import CardGallery from "./CardGallery";
import CardsContext from "../../Context/card-context";

import PaginationControls from "../UI/PaginationControls";

const CardCatalogue = () => {
  const ctx = useContext(CardsContext);

  const [activeTab, setActiveTab] = useState("catalogue");
  const [searchError, setSearchError] = useState(false);

  const activeTabHandler = (listItemId) => {
    setActiveTab(listItemId);
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
    getCardData(`?fname=${cardSearchQuery}`);
  };

  const getCardData = async (endpParams) => {
    try {
      const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php${endpParams}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Request Failed!");
      const receivedObj = await res.json();
      ctx.dispatchCardData({
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
    getCardData("?staple=yes");
  }, []);

  const cardList = (
    <>
      <CatalogueTextSearch cardSearchHandler={cardSearchHandler} />
      <div className={styles["card-catalogue__action-btns"]}>
        <CardCatalogueActionButtons />
      </div>
      <CardGallery
        // currentCards={currentCards}
        currentCards={ctx.cardData.fifteenCardDataChunk}
        searchErrorStatus={searchError}
      />
      <PaginationControls />
    </>
  );

  // console.log(currentCards);
  // console.log(ctx.cardData.allCardData);

  const bookmarks = (
    <>
      <CardGallery currentCards={ctx.bookmarkedCards} />
      <PaginationControls />
    </>
  );

  return (
    <section className={styles["card-catalogue"]}>
      <TabMenu
        listData={tabMenuData}
        activeTab={activeTab}
        activeTabHandler={activeTabHandler}
      />
      {activeTab === "catalogue" && cardList}
      {activeTab === "bookmarks" && bookmarks}
    </section>
  );
};

export default CardCatalogue;
