import styles from "./CatalogueTextSearch.module.css";

import useScreenWidth from "../../hooks/use-screen-width";
import CircularButton from "../UI/Buttons/CircularButton";

const CatalogueTextSearch = (props) => {
  const screenWidth = useScreenWidth(1500);

  const cardSearchSubmitHandler = (e) => {
    e.preventDefault();
    const cardSearchSubmission = e.target[0].value;
    const clickedButtonValue = e.target[1].value;
    if (!cardSearchSubmission && clickedButtonValue !== "clearSearchButton")
      return;
    props.setSearchMade((prevState) => !prevState);
    props.cardSearchHandler(cardSearchSubmission, clickedButtonValue);
  };

  return (
    <form
      className={styles["catalogue-form"]}
      onSubmit={(e) => cardSearchSubmitHandler(e)}
    >
      <input
        className={styles["catalogue-form__input"]}
        type="text"
        id="card-name"
        placeholder="Search Cards"
        value={props.searchInput}
        onChange={(e) => props.searchInputHandler(e)}
      />
      {!props.searchMade && (
        <CircularButton
          imgSrc="/media/icons/magnifying-glass-icon.png"
          imgAlt="A magnifying glass"
          value="submitSearchButton"
        />
      )}
      {props.searchMade && (
        <CircularButton
          imgSrc="/media/icons/cross-icon.png"
          imgAlt="A cross symbol"
          value="clearSearchButton"
          active={true}
        />
      )}
      {!screenWidth && (
        <CircularButton
          imgSrc="/media/icons/ellipsis-icon.png"
          imgAlt="An ellipsis symbol"
          value="clearSearchButton"
        />
      )}
    </form>
  );
};

export default CatalogueTextSearch;
