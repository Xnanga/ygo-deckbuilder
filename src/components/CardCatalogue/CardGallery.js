import { useEffect, useContext, useReducer, useState } from "react";

import styles from "./CardGallery.module.css";

import CardsContext from "../../Context/card-context";
import CircularButton from "../UI/Buttons/CircularButton";
import PaginationDisplay from "../UI/PaginationDisplay";

const cardDataReducer = (state, action) => {
  // New set of searched card data
  if (action.type === "updateFullCardData") {
    const firstFifteenCards = action.data.slice(0, 15);
    const requiredPages = Math.ceil(action.data.length / 15);

    return {
      allCardData: action.data,
      fifteenCardDataChunk: firstFifteenCards,
      totalPaginationPages: requiredPages,
      currentPaginationpage: 1,
    };
  }

  // Show new 15 card chunk when moving one page forward
  if (action.type === "nextFifteenCardDataChunk") {
    // If on last pagination page, no state changes
    if (state.currentPaginationpage === state.totalPaginationPages) {
      return {
        allCardData: state.allCardData,
        fifteenCardDataChunk: state.fifteenCardDataChunk,
        totalPaginationPages: state.totalPaginationPages,
        currentPaginationpage: state.currentPaginationpage,
      };
    }

    const fifteenCardLastIndexID = state.fifteenCardDataChunk[14]?.id;
    const fifteenthCardIndexInAllCardData = state.allCardData.findIndex(
      (card) => card.id === fifteenCardLastIndexID
    );

    const nextFifteenCards = state.allCardData.slice(
      fifteenthCardIndexInAllCardData + 1,
      fifteenthCardIndexInAllCardData + 16
    );

    // If no cards in newest fifteen chunk, no state changes
    if (nextFifteenCards.length < 1) {
      return {
        allCardData: state.allCardData,
        fifteenCardDataChunk: state.fifteenCardDataChunk,
        totalPaginationPages: state.totalPaginationPages,
        currentPaginationpage: state.currentPaginationpage,
      };
    }

    return {
      allCardData: state.allCardData,
      fifteenCardDataChunk: nextFifteenCards,
      totalPaginationPages: state.totalPaginationPages,
      currentPaginationpage: state.currentPaginationpage + 1,
    };
  }

  // Show previous 15 card chunk when moving one page backwards
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
        totalPaginationPages: state.totalPaginationPages,
        currentPaginationpage: state.currentPaginationpage,
      };
    }

    return {
      allCardData: state.allCardData,
      fifteenCardDataChunk: previousFifteenCards,
      totalPaginationPages: state.totalPaginationPages,
      currentPaginationpage: state.currentPaginationpage - 1,
    };
  }
};

const CardGallery = (props) => {
  const ctx = useContext(CardsContext);

  const [cardData, dispatchCardData] = useReducer(cardDataReducer, {
    allCardData: [],
    fifteenCardDataChunk: [],
    totalPaginationPages: 0,
    currentPaginationpage: 0,
  });

  const cardFocusHandler = (e) => {
    const clickedCardID = +e.target.id;
    const clickedCardData = cardData.fifteenCardDataChunk.find(
      (card) => card.id === clickedCardID
    );
    ctx.setFocusedCard(clickedCardData);
  };

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
        {!props.searchErrorStatus &&
          cardData.fifteenCardDataChunk.map((card) => {
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
      <div className={styles["card-gallery__pagination-controls-container"]}>
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
        <PaginationDisplay
          currentPage={cardData.currentPaginationpage}
          totalPages={cardData.totalPaginationPages}
        />
      </div>
    </div>
  );
};

export default CardGallery;
