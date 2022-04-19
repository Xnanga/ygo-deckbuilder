import styles from "./DeckHubGallery.module.css";

import CardGalleryImage from "../CardCatalogue/CardGalleryImage";

const DeckHubGallery = (props) => {
  const cardFocusHandler = (e) => {
    const clickedCardID = +e.target.id;
    const clickedCardData = props.currentCards.find(
      (card) => card.id === clickedCardID
    );
    props.dispatchCardData({
      type: "updateFocusedCard",
      data: clickedCardData,
    });
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
