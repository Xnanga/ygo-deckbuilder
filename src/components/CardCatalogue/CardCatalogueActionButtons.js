import { useState } from "react";

import styles from "./CardCatalogueActionButtons.module.css";

import RectangularButton from "../UI/Buttons/RectangularButton";
import Modal from "../UI/Modals/Modal";
import CatalogueFilterMenu from "./CatalogueFilterMenu";
import CatalogueSortMenu from "./CatalogueSortMenu";

const CardCatalogueActionButtons = (props) => {
  const [modalVisible, setModalVisible] = useState(null);

  const closeModalHandler = () => {
    setModalVisible(null);
  };

  const removeFilteringSorting = () => {
    props.dispatchCardData({
      type: "returnToSearchedData",
    });
  };

  return (
    <div className={styles["action-buttons-container"]}>
      {modalVisible === "filters" && (
        <Modal modalTitle="Card Filters" closeModalHandler={closeModalHandler}>
          <CatalogueFilterMenu
            dispatchCardData={props.dispatchCardData}
            closeModalHandler={closeModalHandler}
          />
        </Modal>
      )}
      {modalVisible === "sorting" && (
        <Modal modalTitle="Card Sorting" closeModalHandler={closeModalHandler}>
          <CatalogueSortMenu
            dispatchCardData={props.dispatchCardData}
            closeModalHandler={closeModalHandler}
          />
        </Modal>
      )}
      <RectangularButton
        onButtonClick={() => setModalVisible("filters")}
        imgSrc="/media/icons/filter-icon.png"
        imgAlt="A filter icon"
        buttonText="Filter"
      />
      <RectangularButton
        onButtonClick={() => setModalVisible("sorting")}
        imgSrc="/media/icons/sort-icon.png"
        imgAlt="A sort icon"
        buttonText="Sort"
      />
      <RectangularButton
        onButtonClick={removeFilteringSorting}
        imgSrc="/media/icons/trash-icon.png"
        imgAlt="A rubbish bin icon"
        buttonText="Clear"
      />
    </div>
  );
};

export default CardCatalogueActionButtons;
