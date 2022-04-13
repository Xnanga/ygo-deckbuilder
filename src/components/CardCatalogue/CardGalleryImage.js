import { useState } from "react";

import styles from "./CardGalleryImage.module.css";

import LoadingGif from "../UI/LoadingGif";

const CardGalleryImage = (props) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoading = () => {
    setImageLoading(false);
  };

  const imgClass = imageLoading
    ? styles["card-gallery-card__img--hidden"]
    : styles["card-gallery-card__img"];

  return (
    <div
      className={styles["card-gallery-card"]}
      onClick={(e) => props.cardFocusHandler(e)}
    >
      {imageLoading && <LoadingGif />}
      <img
        id={props.cardId}
        className={imgClass}
        src={`https://storage.googleapis.com/ygoprodeck.com/pics_small/${props.cardId}.jpg`}
        alt={props.cardName}
        onLoad={handleImageLoading}
      />
    </div>
  );
};

export default CardGalleryImage;
