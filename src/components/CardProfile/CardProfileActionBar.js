import styles from "./CardProfileActionBar.module.css";

import CircularButton from "../UI/Buttons/CircularButton";
import RectangularButton from "../UI/Buttons/RectangularButton";

const CardProfileActionBar = (props) => {
  const bookmarkButtonClickHandler = () => {
    const allBookmarks = props.bookmarkedCards.slice();
    if (!allBookmarks.some((card) => card.id === props.focusedCard.id)) {
      props.dispatchCardData({
        type: "updateBookmarkedCards",
        update: "add",
        data: props.focusedCard,
      });
    } else {
      props.dispatchCardData({
        type: "updateBookmarkedCards",
        update: "remove",
        data: props.focusedCard,
      });
    }
  };

  const addRemoveButtonClickHandler = () => {
    console.log("Add or Remove button clicked.");
  };

  return (
    <div className={styles["card-profile-action-bar"]}>
      <CircularButton
        onButtonClick={bookmarkButtonClickHandler}
        imgSrc="/media/icons/bookmark-icon.png"
        imgAlt="A bookmark icon"
      />
      <RectangularButton
        onButtonClick={addRemoveButtonClickHandler}
        imgSrc="/media/icons/card-back-icon.png"
        imgAlt="A bookmark icon"
        buttonText="-1"
      />
      <RectangularButton
        onButtonClick={addRemoveButtonClickHandler}
        imgSrc="/media/icons/card-back-icon.png"
        imgAlt="A bookmark icon"
        buttonText="+1"
      />
    </div>
  );
};

export default CardProfileActionBar;
