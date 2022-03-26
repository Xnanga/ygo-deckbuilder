import { useEffect, useState, useReducer } from "react";

import styles from "./CardGallery.module.css";

import CircularButton from "../UI/Buttons/CircularButton";
import PaginationDisplay from "../UI/PaginationDisplay";

const cardDataReducer = (state, action) => {
  if ((action.type = "updateFullCardData")) {
    const firstFifteenCards = action.data.slice(0, 15);
    return {
      allCardData: action.data,
      fifteenCardDataChunk: firstFifteenCards,
    };
  }
  if ((action.type = "nextFifteenCardDataChunk")) {
    // Figure out index of last card in data chunk in allcarddata
    // Slice the next 15 indices
    // Update fifteenCardDataChunk with these 15 indices

    const firstFifteenCards = action.data.slice(0, 15);
    return {
      allCardData: state.allCardData,
      fifteenCardDataChunk: firstFifteenCards,
    };
  }

  // "prevFifteenCardDataChunk"
};

const CardGallery = (props) => {
  const [cardData, dispatchCardData] = useReducer(cardDataReducer, {
    allCardData: [],
    fifteenCardDataChunk: [],
  });

  useEffect(() => {
    if (props.currentCards.data) {
      // setAllCardData(props.currentCards.data);
      dispatchCardData({
        type: "updateFullCardData",
        data: props.currentCards.data,
      });
      console.log("UseEffect Fired");
    }
  }, [props.currentCards.data]);

  return (
    <div className={styles["card-gallery-container"]}>
      <section className={styles["card-gallery"]}>
        {cardData.fifteenCardDataChunk.map((card) => {
          return (
            <div className={styles["card-gallery__card"]}>
              <img
                className={styles["card-gallery__card-img"]}
                src={`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card.id}.jpg`}
                alt={card.name}
              />
            </div>
          );
        })}

        {/* <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div> */}
      </section>
      <div className={styles["card-gallery__pagination-controls"]}>
        <CircularButton
          imgSrc="/media/icons/left-icon.png"
          imgAlt="A Left Icon"
          onClick={() => console.log("Left")}
        />
        <CircularButton
          imgSrc="/media/icons/right-icon.png"
          imgAlt="A Right Icon"
          onClick={() => console.log("Right")}
        />
      </div>
    </div>
  );
};

export default CardGallery;
