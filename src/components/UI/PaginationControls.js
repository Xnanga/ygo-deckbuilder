import styles from "./PaginationControls.module.css";

import CircularButton from "./Buttons/CircularButton";
import PaginationDisplay from "./PaginationDisplay";

const PaginationControls = (props) => {
  const paginationHandler = (direction) => {
    if (direction === "right") {
      props.dispatchCardData({
        type: "nextFifteenCardDataChunk",
      });
    }
    if (direction === "left") {
      props.dispatchCardData({
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
        currentPage={props.currentPage}
        totalPages={props.totalPages}
      />
    </div>
  );
};

export default PaginationControls;
