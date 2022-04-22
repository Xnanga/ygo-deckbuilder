import { useState } from "react";

import styles from "./HeaderBar.module.css";

import AppLogo from "./AppLogo";
import RectangularButton from "./Buttons/RectangularButton";
import MiniModal from "./Modals/MiniModal";

const HeaderBar = (props) => {
  const [miniModalVisible, setMiniModalVisible] = useState(false);

  const miniModalVisibilityHandler = (bool) => {
    if (typeof bool !== "boolean") return;
    setMiniModalVisible(bool);
  };

  const clearAllDeckDataHandler = (buttonValue) => {
    console.log(buttonValue);
    if (buttonValue === "ClearDeckData") {
      props.dispatchDeckData({
        type: "resetAllDeckData",
      });
    }
    setMiniModalVisible(false);
  };

  const miniModalButtonData = [
    {
      id: "Do Not Clear Deck Data",
      label: "No",
      value: "doNotClearDeckData",
      additionalClass: "green",
    },
    {
      id: "Clear Deck Data",
      label: "Yes",
      value: "ClearDeckData",
      additionalClass: "red",
    },
  ];

  return (
    <header className={styles.header}>
      {miniModalVisible && (
        <MiniModal
          message="Are you sure you want to clear all deck data?"
          buttonsData={miniModalButtonData}
          buttonAction={clearAllDeckDataHandler}
        />
      )}
      <AppLogo
        imgSrc="/media/icons/ygo-logo.png"
        imgAlt="The Yu-Gi-Oh! Logo"
        optionalText="Deckbuilder"
      />
      <RectangularButton
        onButtonClick={() => miniModalVisibilityHandler(true)}
        buttonText="Clear Deck Data"
      />
      <RectangularButton
        onButtonClick={() => console.log("Export Button Click")}
        buttonText="Export Deck Data"
      />
    </header>
  );
};

export default HeaderBar;
