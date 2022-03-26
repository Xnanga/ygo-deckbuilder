import { useEffect, useState } from "react";

import styles from "./CardCatalogue.module.css";

import TabMenu from "../UI/Menus/TabMenu";
import CatalogueTextSearch from "./CatalogueTextSearch";
import RectangularButton from "../UI/Buttons/RectangularButton";
import CardGallery from "./CardGallery";

const CardCatalogue = () => {
  const [currentCards, setCurrentCards] = useState([]);

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

  const getCardData = async (endpParams) => {
    try {
      const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php${endpParams}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Request Failed!");
      const data = await res.json();
      setCurrentCards(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCardData("?archetype=Blue-Eyes");
  }, []);

  return (
    <section className={styles["card-catalogue"]}>
      <TabMenu listData={tabMenuData} />
      <CatalogueTextSearch />
      <div className={styles["card-catalogue__action-btns"]}>
        <RectangularButton
          onButtonClick={() => console.log("Button Click")}
          imgSrc="None"
          imgAlt="None"
          buttonText="Button"
        />
        <RectangularButton
          onButtonClick={() => console.log("Button Click")}
          imgSrc="None"
          imgAlt="None"
          buttonText="Button"
        />
        <RectangularButton
          onButtonClick={() => console.log("Button Click")}
          imgSrc="None"
          imgAlt="None"
          buttonText="Button"
        />
      </div>
      <CardGallery currentCards={currentCards} />
    </section>
  );
};

export default CardCatalogue;
