import { useEffect, useState } from "react";

import styles from "./CardGallery.module.css";

import useScreenWidth from "../../hooks/use-screen-width";
import CardGalleryImage from "./CardGalleryImage";

const CardGallery = (props) => {
  const screenWidth = useScreenWidth(1500);
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

    if (!screenWidth) {
      props.cardProfileModalVisibilityHandler(true);
    }
  };

  useEffect(() => {
    if (!props.currentCards || props.currentCards.length < 1) {
      setErrorMessage(
        <span className={styles["card-gallery__error-text"]}>
          No Cards Found
        </span>
      );
      return;
    }
    if (props.currentCards.length > 0) setErrorMessage(null);
    if (props.searchErrorStatus) {
      setErrorMessage(
        <span className={styles["card-gallery__error-text"]}>
          Something went wrong...
        </span>
      );
      return;
    }
  }, [props.currentCards, props.searchErrorStatus]);

  return (
    <div className={styles["card-gallery-container"]}>
      <section className={styles["card-gallery"]}>
        {errorMessage
          ? errorMessage
          : props?.currentCards?.map((card, index) => {
              return (
                <div
                  key={card.id + index}
                  className={styles["card-gallery__card-container"]}
                >
                  <CardGalleryImage
                    key={card.id}
                    cardId={card.id}
                    cardName={card.name}
                    cardFocusHandler={cardFocusHandler}
                  />
                </div>
              );
            })}
      </section>
    </div>
  );
};

export default CardGallery;
