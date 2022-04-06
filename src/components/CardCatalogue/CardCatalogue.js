import { useEffect, useState } from "react";

import styles from "./CardCatalogue.module.css";

import TabMenu from "../UI/Menus/TabMenu";
import CatalogueTextSearch from "./CatalogueTextSearch";
import CardCatalogueActionButtons from "./CardCatalogueActionButtons";
import CardGallery from "./CardGallery";

import PaginationControls from "../UI/PaginationControls";

const CardCatalogue = () => {
  const [currentCards, setCurrentCards] = useState([]);
  const [searchError, setSearchError] = useState(false);

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
      const data = await res.json();
      setCurrentCards(data);
      setSearchError(false);
    } catch (error) {
      console.error(error);
      setSearchError(true);
    }
  };

  useEffect(() => {
    getCardData("?staple=yes");
  }, []);

  return (
    <section className={styles["card-catalogue"]}>
      <TabMenu listData={tabMenuData} />
      <CatalogueTextSearch cardSearchHandler={cardSearchHandler} />
      <div className={styles["card-catalogue__action-btns"]}>
        <CardCatalogueActionButtons />
      </div>
      <CardGallery
        currentCards={currentCards}
        searchErrorStatus={searchError}
      />
      <PaginationControls />
    </section>
  );
};

export default CardCatalogue;
