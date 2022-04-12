import styles from "./CardGallery.module.css";

import LoadingGif from "../UI/LoadingGif";
import { useEffect, useState } from "react";

const CardGallery = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);

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

  useEffect(() => {
    if (props.currentCards.length < 1)
      setErrorMessage(
        <span className={styles["card-gallery__error-text"]}>
          No Cards Found
        </span>
      );
    else if (props.currentCards) setErrorMessage(null);
  }, [props.currentCards]);

  return (
    <div className={styles["card-gallery-container"]}>
      <section className={styles["card-gallery"]}>
        {errorMessage
          ? errorMessage
          : props?.currentCards?.map((card) => {
              return (
                <div
                  key={card.id}
                  className={styles["card-gallery__card"]}
                  onClick={(e) => cardFocusHandler(e)}
                >
                  {!card.id ? (
                    <LoadingGif />
                  ) : (
                    <img
                      id={card.id}
                      className={styles["card-gallery__card-img"]}
                      src={`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card.id}.jpg`}
                      alt={card.name}
                    />
                  )}
                </div>
              );
            })}
        {props.searchErrorStatus && <p>No cards found - please try again</p>}
      </section>
    </div>
  );
};

export default CardGallery;
