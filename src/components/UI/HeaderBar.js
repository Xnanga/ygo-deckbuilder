import { useState } from "react";

import styles from "./HeaderBar.module.css";

import AppLogo from "./AppLogo";
import RectangularButton from "./Buttons/RectangularButton";
import MiniModal from "./Modals/MiniModal";

const HeaderBar = (props) => {
  const [miniModalVisible, setMiniModalVisible] = useState(null);

  const miniModalVisibilityHandler = (miniModalName) => {
    setMiniModalVisible(miniModalName);
  };

  const clearAllDeckDataHandler = (buttonValue) => {
    if (buttonValue === "clearDeckData") {
      props.dispatchDeckData({
        type: "resetAllDeckData",
      });
    }
    setMiniModalVisible(false);
  };

  const exportAllDeckDataHandler = (buttonValue) => {
    if (buttonValue === "exportDeckData") {
      props.exportDeckDataHandler();
    }
    setMiniModalVisible(false);
  };

  const clearDeckMiniModalButtonData = [
    {
      id: "Do Not Clear Deck Data",
      label: "No",
      value: "doNotClearDeckData",
      additionalClass: "green",
    },
    {
      id: "Clear Deck Data",
      label: "Yes",
      value: "clearDeckData",
      additionalClass: "red",
    },
  ];

  const exportDeckMiniModalButtonData = [
    {
      id: "Do Not Export Deck Data",
      label: "No",
      value: "doNotExportDeckData",
      additionalClass: "red",
    },
    {
      id: "Export Deck Data",
      label: "Yes",
      value: "exportDeckData",
      additionalClass: "green",
    },
  ];

  const deckHeaderButtonsVisible =
    props.deckData.mainDeckCardCount > 0 ? true : false;

  return (
    <header className={styles.header}>
      {miniModalVisible === "clearDeckMiniModal" && (
        <MiniModal
          message="Are you sure you want to clear all deck data?"
          buttonsData={clearDeckMiniModalButtonData}
          buttonAction={clearAllDeckDataHandler}
        />
      )}
      {miniModalVisible === "exportDeckMiniModal" && (
        <MiniModal
          message="Export all deck data to XLSX?"
          buttonsData={exportDeckMiniModalButtonData}
          buttonAction={exportAllDeckDataHandler}
        />
      )}
      <AppLogo
        imgSrc="/media/icons/ygo-logo.png"
        imgAlt="The Yu-Gi-Oh! Logo"
        optionalText="Deckbuilder"
      />
      {deckHeaderButtonsVisible && (
        <>
          <RectangularButton
            onButtonClick={() =>
              miniModalVisibilityHandler("clearDeckMiniModal")
            }
            buttonText="Clear Deck Data"
          />
          <RectangularButton
            onButtonClick={() =>
              miniModalVisibilityHandler("exportDeckMiniModal")
            }
            buttonText="Export Deck Data"
          />
        </>
      )}
    </header>
  );
};

export default HeaderBar;
