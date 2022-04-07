import { useContext } from "react";

import styles from "./CardProfileActionBar.module.css";

import CircularButton from "../UI/Buttons/CircularButton";
import RectangularButton from "../UI/Buttons/RectangularButton";
import CardsContext from "../../Context/card-context";
import CatalogueTextSearch from "../CardCatalogue/CatalogueTextSearch";

const CardProfileActionBar = () => {
  const ctx = useContext(CardsContext);

  const bookmarkButtonClickHandler = () => {
    ctx.setBookmarkedCards((currentCards) => {
      const allBookmarks = currentCards.slice();
      if (!allBookmarks.some((card) => card.id === ctx.focusedCard.id)) {
        allBookmarks.push(ctx.focusedCard);
      } else {
        // Remove card from bookmarks
      }
      return allBookmarks;
    });
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
