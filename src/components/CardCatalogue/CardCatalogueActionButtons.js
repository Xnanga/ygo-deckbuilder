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
    <>
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
        imgSrc="None"
        imgAlt="None"
        buttonText="Filter"
      />
      <RectangularButton
        onButtonClick={() => setModalVisible("sorting")}
        imgSrc="None"
        imgAlt="None"
        buttonText="Sort"
      />
    </>
  );
};

export default CardCatalogueActionButtons;
