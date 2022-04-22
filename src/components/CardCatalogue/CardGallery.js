import { useEffect, useState } from "react";

import styles from "./CardGallery.module.css";

import useScreenWidth from "../../hooks/use-screen-width";
import CardGalleryImage from "./CardGalleryImage";
import LoadingGif from "../UI/LoadingGif";

const CardGallery = (props) => {
  const screenWidth = useScreenWidth(1500);
  const [errorMessage, setErrorMessage] = useState(null);
  const [galleryLoading, setGalleryLoading] = useState(true);

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
    if (props.currentCards.length < 1) {
      setErrorMessage(
        <span className={styles["card-gallery__error-text"]}>
          No Cards Found
        </span>
      );
      return;
    }
    if (!props.currentCards) {
      setGalleryLoading(true);
    }

    if (props.currentCards.length > 0) {
      setErrorMessage(null);
      setGalleryLoading(false);
    }

    if (props.searchErrorStatus) {
      setErrorMessage(
        <span className={styles["card-gallery__error-text"]}>
          Something went wrong...
        </span>
      );
      return;
    }
  }, [props.currentCards, props.searchErrorStatus]);

  const mappedCardGalleryContent = props?.currentCards?.map((card, index) => {
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
  });

  return (
    <div className={styles["card-gallery-container"]}>
      <section className={styles["card-gallery"]}>
        {galleryLoading ? (
          <LoadingGif />
        ) : (
          errorMessage || mappedCardGalleryContent
        )}
      </section>
    </div>
  );
};

export default CardGallery;
