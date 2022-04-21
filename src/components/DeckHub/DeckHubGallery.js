import styles from "./DeckHubGallery.module.css";

import useScreenWidth from "../../hooks/use-screen-width";
import CardGalleryImage from "../CardCatalogue/CardGalleryImage";

const DeckHubGallery = (props) => {
  const screenWidth = useScreenWidth(1500);

  const cardFocusHandler = (e) => {
    const clickedCardID = +e.target.id;
    const clickedCardData = props.currentCards.find(
      (card) => card.id === clickedCardID
    );
    props.dispatchCardData({
      type: "updateFocusedCard",
      data: clickedCardData,
    });

    if (!screenWidth) {
      props.cardProfileModalVisibilityHandler(true);
    }
  };

  return (
    <div className={styles["deck-hub-gallery"]}>
      {props.currentCards &&
        props.currentCards.map((card, index) => {
          return (
            <div
              key={card.id + index}
              className={styles["deck-hub-gallery__card-container"]}
            >
              <CardGalleryImage
                cardId={card.id}
                cardName={card.name}
                cardFocusHandler={cardFocusHandler}
              />
            </div>
          );
        })}
    </div>
  );
};

export default DeckHubGallery;
