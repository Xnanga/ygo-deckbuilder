import styles from "./CardCatalogueActionButtons.module.css";

import { useState } from "react";
import RectangularButton from "../UI/Buttons/RectangularButton";
import Modal from "../UI/Modals/Modal";
import CatalogueFilterMenu from "./CatalogueFilterMenu";
import CatalogueSortMenu from "./CatalogueSortMenu";

const CardCatalogueActionButtons = (props) => {
  const [modalVisible, setModalVisible] = useState(null);

  const closeModalHandler = () => {
    setModalVisible(null);
  };

  return (
    <div className={styles["action-buttons-container"]}>
      {modalVisible === "filters" && (
        <Modal modalTitle="Card Filters" closeModalHandler={closeModalHandler}>
          <CatalogueFilterMenu dispatchCardData={props.dispatchCardData} />
        </Modal>
      )}
      {modalVisible === "sorting" && (
        <Modal modalTitle="Card Sorting" closeModalHandler={closeModalHandler}>
          <CatalogueSortMenu />
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
        onButtonClick={() => console.log("Reset Filters")}
        imgSrc="/media/icons/trash-icon.png"
        imgAlt="A rubbish bin icon"
        buttonText="Clear"
      />
    </div>
  );
};

export default CardCatalogueActionButtons;
