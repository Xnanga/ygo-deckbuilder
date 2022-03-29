import { useEffect, useState, useReducer } from "react";

import styles from "./CardGallery.module.css";

import CircularButton from "../UI/Buttons/CircularButton";
import PaginationDisplay from "../UI/PaginationDisplay";

const cardDataReducer = (state, action) => {
  if (action.type === "updateFullCardData") {
    const firstFifteenCards = action.data.slice(0, 15);
    return {
      allCardData: action.data,
      fifteenCardDataChunk: firstFifteenCards,
    };
  }
  if (action.type === "nextFifteenCardDataChunk") {
    const fifteenCardLastIndexID = state.fifteenCardDataChunk[14]?.id;
    const fifteenthCardIndexInAllCardData = state.allCardData.findIndex(
      (card) => card.id === fifteenCardLastIndexID
    );

    // Need to find a way to prevent first 15 card chunk being visitable again via here

    const nextFifteenCards = state.allCardData.slice(
      fifteenthCardIndexInAllCardData + 1,
      fifteenthCardIndexInAllCardData + 16
    );

    if (nextFifteenCards.length < 1) {
      return {
        allCardData: state.allCardData,
        fifteenCardDataChunk: state.fifteenCardDataChunk,
      };
    }

    return {
      allCardData: state.allCardData,
      fifteenCardDataChunk: nextFifteenCards,
    };
  }

  if (action.type === "prevFifteenCardDataChunk") {
    const firstCardIndexID = state.fifteenCardDataChunk[0]?.id;
    const firstCardIndexInAllCardData = state.allCardData.findIndex(
      (card) => card.id === firstCardIndexID
    );
    const previousFifteenCards = state.allCardData.slice(
      firstCardIndexInAllCardData - 15,
      firstCardIndexInAllCardData
    );

    if (previousFifteenCards.length < 15) {
      return {
        allCardData: state.allCardData,
        fifteenCardDataChunk: state.fifteenCardDataChunk,
      };
    } else {
      return {
        allCardData: state.allCardData,
        fifteenCardDataChunk: previousFifteenCards,
      };
    }
  }
};

const CardGallery = (props) => {
  const [cardData, dispatchCardData] = useReducer(cardDataReducer, {
    allCardData: [],
    fifteenCardDataChunk: [],
  });

  const paginationHandler = (direction) => {
    if (direction === "right") {
      dispatchCardData({
        type: "nextFifteenCardDataChunk",
      });
    }
    if (direction === "left") {
      dispatchCardData({
        type: "prevFifteenCardDataChunk",
      });
    }
  };

  useEffect(() => {
    if (props.currentCards.data && props.currentCards.data !== cardData) {
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
            <div key={card.id} className={styles["card-gallery__card"]}>
              <img
                className={styles["card-gallery__card-img"]}
                src={`https://storage.googleapis.com/ygoprodeck.com/pics_small/${card.id}.jpg`}
                alt={card.name}
              />
            </div>
          );
        })}
      </section>
      <div className={styles["card-gallery__pagination-controls"]}>
        <CircularButton
          imgSrc="/media/icons/left-icon.png"
          imgAlt="A Left Icon"
          onButtonClick={() => paginationHandler("left")}
        />
        <CircularButton
          imgSrc="/media/icons/right-icon.png"
          imgAlt="A Right Icon"
          onButtonClick={() => paginationHandler("right")}
        />
      </div>
    </div>
  );
};

export default CardGallery;
