import { useState } from "react";

import styles from "./CardProfileImage.module.css";

import LoadingGif from "../UI/LoadingGif";

const CardProfileImage = (props) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoading = () => {
    setImageLoading(false);
  };

  const imgClass = imageLoading
    ? styles["card-profile-image--hidden"]
    : styles["card-profile-image"];

  return (
    <>
      {imageLoading && <LoadingGif />}
      <img
        className={imgClass}
        src={props.cardImgSrc}
        alt={props.cardImgAlt}
        onLoad={handleImageLoading}
      ></img>
    </>
  );
};

export default CardProfileImage;
