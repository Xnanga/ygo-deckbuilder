import styles from "./CardProfileActionBar.module.css";

import CircularButton from "../UI/Buttons/CircularButton";
import RectangularButton from "../UI/Buttons/RectangularButton";

const CardProfileActionBar = () => {
  const bookmarkButtonClickHandler = () => {
    console.log("Bookmark button clicked.");
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
