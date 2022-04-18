import styles from "./DeckHubGallery.module.css";

import CardGalleryImage from "../CardCatalogue/CardGalleryImage";

const DeckHubGallery = (props) => {
  return (
    <div className={styles["deck-hub-gallery"]}>
      {props.currentCards &&
        props.currentCards.map((card, index) => {
          return (
            <div
              key={card.id + index}
              className={styles["deck-hub-gallery__card-container"]}
            >
              <CardGalleryImage cardId={card.id} cardName={card.name} />
            </div>
          );
        })}
    </div>
  );
};

export default DeckHubGallery;
