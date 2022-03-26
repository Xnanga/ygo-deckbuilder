import { useState } from "react";

import styles from "./TabMenu.module.css";

const TabMenu = (props) => {
  const [activeTab, setActiveTab] = useState("catalogue");

  const activeTabHandler = (listItemId) => {
    setActiveTab(listItemId);
  };

  const determineTabClass = (listItemId) => {
    if (listItemId === activeTab) {
      return `${styles["nav__list-item"]} ${styles["nav__list-item--active"]}`;
    } else {
      return styles["nav__list-item"];
    }
  };

  const allListItems = props.listData.map((listItem) => {
    return (
      <li
        className={determineTabClass(listItem.id)}
        key={listItem.id}
        onClick={() => activeTabHandler(listItem.id)}
      >
        <img
          className={styles["nav__list-item__img"]}
          src={listItem.imgSrc}
          alt={listItem.imgAlt}
        />
        {listItem.label && (
          <span className={styles["nav__list-item__label"]}>
            {listItem.label}
          </span>
        )}
      </li>
    );
  });

  return (
    <nav className={styles.nav}>
      <ul className={styles["nav__list"]}>{allListItems}</ul>
    </nav>
  );
};

export default TabMenu;