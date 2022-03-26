import styles from "./CardCatalogue.module.css";

import TabMenu from "../UI/Menus/TabMenu";
import CatalogueTextSearch from "./CatalogueTextSearch";
import RectangularButton from "../UI/Buttons/RectangularButton";
import CardGallery from "./CardGallery";

const CardCatalogue = () => {
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

  return (
    <section className={styles["card-catalogue"]}>
      <TabMenu listData={tabMenuData} />
      <CatalogueTextSearch />
      <div className={styles["card-catalogue__action-btns"]}>
        <RectangularButton
          onButtonClick={console.log("Button Click")}
          imgSrc="None"
          imgAlt="None"
          buttonText="Button"
        />
        <RectangularButton
          onButtonClick={console.log("Button Click")}
          imgSrc="None"
          imgAlt="None"
          buttonText="Button"
        />
        <RectangularButton
          onButtonClick={console.log("Button Click")}
          imgSrc="None"
          imgAlt="None"
          buttonText="Button"
        />
      </div>
      <CardGallery />
    </section>
  );
};

export default CardCatalogue;
