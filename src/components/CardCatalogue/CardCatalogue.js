import styles from "./CardCatalogue.module.css";

import TabMenu from "../UI/Menus/TabMenu";

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
    },
  ];

  return (
    <section className={styles["card-catalogue"]}>
      <TabMenu listData={tabMenuData} />
    </section>
  );
};

export default CardCatalogue;
