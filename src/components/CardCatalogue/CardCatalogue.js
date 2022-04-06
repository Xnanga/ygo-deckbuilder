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

  const filterCurrentCards = (filterSettings) => {
    console.log("Filter button clicked!");

    // if (filterType === "Only Monsters") {
    //   const filteredCards = currentCards.data.filter((card) => {
    //     return card.type.includes("Monster");
    //   });
    //   const packagedCards = { data: filteredCards };
    //   setCurrentCards(packagedCards);
    // }

    // Filters
    // cardType: Monster / Spell / Trap
    // monsterType: Normal / Effect / Ritual / Fusion / Synchro
    // XYZ, Pendulum, Link, Token

    // Monster Race: Aqua, Beast, Beast-Warrior, Cyberse, Dinosaur,
    // Divine-Beast, Dragon, Fairy, Fiend, Fish, Insect, Machine, Plant,
    // Psychic, Pyro, Reptile, Rock, Sea Serpent, Spellcaster, Thunder,
    // Warrior, Winged Beast, Wyrm, and Zombie.

    // Spell Type: Equip / Field / Quickplay / Continuous / Ritual
    // Trap Type: Counter / Continuous
    // Attribute: Dark / Light / Earth / Wind / Fire / Water / Divine
    // Star Level: 1-12
    // Rank Level: 1-13
    // Link Value: 1-6
  };

  useEffect(() => {
    getCardData("?staple=yes");
  }, []);

  return (
    <section className={styles["card-catalogue"]}>
      <TabMenu listData={tabMenuData} />
      <CatalogueTextSearch cardSearchHandler={cardSearchHandler} />
      <div className={styles["card-catalogue__action-btns"]}>
        <CardCatalogueActionButtons filterCardsHandler={filterCurrentCards} />
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
