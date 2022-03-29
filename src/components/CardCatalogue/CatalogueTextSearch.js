import styles from "./CatalogueTextSearch.module.css";

import CircularButton from "../UI/Buttons/CircularButton";

const CatalogueTextSearch = (props) => {
  const cardSearchSubmitHandler = (e) => {
    e.preventDefault();
    const cardSearchSubmission = e.target[0].value;
    props.cardSearchHandler(cardSearchSubmission);
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
      />
      <CircularButton
        imgSrc="/media/icons/magnifying-glass-icon.png"
        imgAlt="A magnifying glass"
      />
    </form>
  );
};

export default CatalogueTextSearch;
