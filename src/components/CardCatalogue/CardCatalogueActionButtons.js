import styles from "./CardCatalogueActionButtons.module.css";

import RectangularButton from "../UI/Buttons/RectangularButton";
import Modal from "../UI/Modals/Modal";
import CatalogueFilterMenu from "./CatalogueFilterMenu";
import CatalogueSortMenu from "./CatalogueSortMenu";

const CardCatalogueActionButtons = (props) => {
  return (
    <div className={styles["action-buttons-container"]}>
      {props.modalVisible === "filters" && (
        <Modal
          modalTitle="Card Filters"
          modalTagline="Only cards matching all filter conditions will be displayed"
          closeModalHandler={props.closeModalHandler}
        >
          <CatalogueFilterMenu
            dispatchCardData={props.dispatchCardData}
            closeModalHandler={props.closeModalHandler}
          />
        </Modal>
      )}
      {props.modalVisible === "sorting" && (
        <Modal
          modalTitle="Card Sorting"
          closeModalHandler={props.closeModalHandler}
          modalTagline="Sort cards by common attributes"
        >
          <CatalogueSortMenu
            dispatchCardData={props.dispatchCardData}
            closeModalHandler={props.closeModalHandler}
          />
        </Modal>
      )}
      <RectangularButton
        onButtonClick={() => props.openModalHandler("filters")}
        imgSrc="/media/icons/filter-icon.png"
        imgAlt="A filter icon"
        buttonText="Filter"
      />
      <RectangularButton
        onButtonClick={() => props.openModalHandler("sorting")}
        imgSrc="/media/icons/sort-icon.png"
        imgAlt="A sort icon"
        buttonText="Sort"
      />
      <RectangularButton
        onButtonClick={props.removeFilteringSortingHandler}
        imgSrc="/media/icons/trash-icon.png"
        imgAlt="A rubbish bin icon"
        buttonText="Clear"
      />
    </div>
  );
};

export default CardCatalogueActionButtons;
