import { useContext } from "react";

import RectangularButton from "../UI/Buttons/RectangularButton";

import CardsContext from "../../Context/card-context";
import Modal from "../UI/Modals/Modal";

const CardCatalogueActionButtons = (props) => {
  const ctx = useContext(CardsContext);

  const modalVisibilityHandler = (modalType) => {
    if (modalType === "filters") {
      ctx.setModalVisible("filters");
    }
    if (modalType === "sorting") {
      ctx.setModalVisible("sorting");
    }
  };

  return (
    <>
      {ctx.modalVisible && <Modal />}
      <RectangularButton
        onButtonClick={() => modalVisibilityHandler("filters")}
        imgSrc="None"
        imgAlt="None"
        buttonText="Filter"
      />
      <RectangularButton
        onButtonClick={() => modalVisibilityHandler("sorting")}
        imgSrc="None"
        imgAlt="None"
        buttonText="Sort"
      />
      <RectangularButton
        onButtonClick={() => console.log("Button Click")}
        imgSrc="None"
        imgAlt="None"
        buttonText="Remove Filters"
      />
    </>
  );
};

export default CardCatalogueActionButtons;
