import { useContext } from "react";

import styles from "./PaginationControls.module.css";

import CardsContext from "../../Context/card-context";
import CircularButton from "./Buttons/CircularButton";
import PaginationDisplay from "./PaginationDisplay";

const PaginationControls = () => {
  const ctx = useContext(CardsContext);

  const paginationHandler = (direction) => {
    if (direction === "right") {
      ctx.dispatchCardData({
        type: "nextFifteenCardDataChunk",
      });
    }
    if (direction === "left") {
      ctx.dispatchCardData({
        type: "prevFifteenCardDataChunk",
      });
    }
  };

  return (
    <div className={styles["pagination-controls-container"]}>
      <div className={styles["pagination-controls"]}>
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
        currentPage={ctx.cardData?.currentPaginationpage}
        totalPages={ctx.cardData?.totalPaginationPages}
      />
    </div>
  );
};

export default PaginationControls;
