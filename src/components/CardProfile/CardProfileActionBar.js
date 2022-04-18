import { useEffect, useState } from "react";

import styles from "./CardProfileActionBar.module.css";

import CircularButton from "../UI/Buttons/CircularButton";
import RectangularButton from "../UI/Buttons/RectangularButton";

const CardProfileActionBar = (props) => {
  const [bookmarkButtonHighlight, setBookmarkButtonHighlight] = useState(false);

  const checkIfCardIsBookmarked = (cardToTest, bookmarksData) => {
    return bookmarksData.some((card) => card.id === cardToTest.id);
  };

  const bookmarkButtonClickHandler = () => {
    const allBookmarks = props.bookmarkedCards.slice();
    if (checkIfCardIsBookmarked(props.focusedCard, allBookmarks)) {
      props.dispatchCardData({
        type: "updateBookmarkedCards",
        update: "remove",
        data: props.focusedCard,
      });
    } else {
      props.dispatchCardData({
        type: "updateBookmarkedCards",
        update: "add",
        data: props.focusedCard,
      });
    }
  };

  const deckButtonsClickHandler = (action) => {
    if (action === "add") {
      props.dispatchDeckData({
        type: "updateDeck",
        update: "add",
        data: props.focusedCard,
      });
    }
    if (action === "remove") {
      props.dispatchDeckData({
        type: "updateDeck",
        update: "remove",
        data: props.focusedCard,
      });
    }
  };

  useEffect(() => {
    setBookmarkButtonHighlight(
      checkIfCardIsBookmarked(props.focusedCard, props.bookmarkedCards)
    );
  }, [props.focusedCard, props.bookmarkedCards]);

  return (
    <div className={styles["card-profile-action-bar"]}>
      <CircularButton
        onButtonClick={bookmarkButtonClickHandler}
        imgSrc="/media/icons/bookmark-icon.png"
        imgAlt="A bookmark icon"
        active={bookmarkButtonHighlight}
      />
      <RectangularButton
        onButtonClick={() => deckButtonsClickHandler("remove")}
        imgSrc="/media/icons/card-back-icon.png"
        imgAlt="A bookmark icon"
        buttonText="-1"
      />
      <RectangularButton
        onButtonClick={() => deckButtonsClickHandler("add")}
        imgSrc="/media/icons/card-back-icon.png"
        imgAlt="A bookmark icon"
        buttonText="+1"
      />
    </div>
  );
};

export default CardProfileActionBar;
