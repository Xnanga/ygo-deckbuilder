import { useContext } from "react";

import styles from "./CardGallery.module.css";

import CardsContext from "../../Context/card-context";

const CardGallery = (props) => {
  const ctx = useContext(CardsContext);

  const cardFocusHandler = (e) => {
    const clickedCardID = +e.target.id;
    const clickedCardData = ctx.cardData.fifteenCardDataChunk.find(
      (card) => card.id === clickedCardID
    );
    ctx.setFocusedCard(clickedCardData);
  };

  return (
    <div className={styles["card-gallery-container"]}>
      <section className={styles["card-gallery"]}>
        {!props.searchErrorStatus &&
          props.currentCards.map((card) => {
            return (
              <div
                key={card.id}
                className={styles["card-gallery__card"]}
                onClick={(e) => cardFocusHandler(e)}
              >
                <img
                  id={card.id}
                  className={styles["card-gallery__card-img"]}
                  src={`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card.id}.jpg`}
                  alt={card.name}
                />
              </div>
            );
          })}
        {props.searchErrorStatus && <p>No cards found - please try again</p>}
      </section>
    </div>
  );
};

export default CardGallery;
