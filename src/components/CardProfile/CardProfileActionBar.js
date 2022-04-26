import { useEffect, useState } from "react";

import styles from "./CardProfileActionBar.module.css";

import CircularButton from "../UI/Buttons/CircularButton";
import RectangularButton from "../UI/Buttons/RectangularButton";

const CardProfileActionBar = (props) => {
  const [bookmarkButtonHighlight, setBookmarkButtonHighlight] = useState(false);
  const [addCardButtonInactive, setAddCardButtonInactive] = useState(false);
  const [removeCardButtonInactive, setRemoveCardButtonInactive] =
    useState(false);

  const checkIfCardIsBookmarked = (cardToTest, bookmarksData) => {
    return bookmarksData.some((card) => card.id === cardToTest.id);
  };

  const checkHowManyCopiesInDeck = (card, deckData) => {
    const matchingCards = deckData.filter((cardInDeck) => {
      return card.id === cardInDeck.id;
    });
    return matchingCards.length;
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

  // Highlight bookmark button if card is bookmarked on load
  useEffect(() => {
    setBookmarkButtonHighlight(
      checkIfCardIsBookmarked(props.focusedCard, props.bookmarkedCards)
    );
  }, [props.focusedCard, props.bookmarkedCards]);

  // Conditionally make add and remove buttons non-interactive
  // depending on number of copies in either deck
  useEffect(() => {
    const copiesInMainDeck = checkHowManyCopiesInDeck(
      props.focusedCard,
      props.mainDeckData
    );
    const copiesInExtraDeck = checkHowManyCopiesInDeck(
      props.focusedCard,
      props.extraDeckData
    );

    if (copiesInMainDeck >= 3 || copiesInExtraDeck >= 3) {
      setAddCardButtonInactive(true);
    } else {
      setAddCardButtonInactive(false);
    }

    if (copiesInMainDeck <= 0 && copiesInExtraDeck <= 0) {
      setRemoveCardButtonInactive(true);
    } else {
      setRemoveCardButtonInactive(false);
    }
  }, [props.focusedCard, props.mainDeckData, props.extraDeckData]);

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
        buttonInactive={removeCardButtonInactive}
      />
      <RectangularButton
        onButtonClick={() => deckButtonsClickHandler("add")}
        imgSrc="/media/icons/card-back-icon.png"
        imgAlt="A bookmark icon"
        buttonText="+1"
        buttonInactive={addCardButtonInactive}
      />
    </div>
  );
};

export default CardProfileActionBar;
