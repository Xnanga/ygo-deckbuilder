import styles from "./CardGallery.module.css";

const CardGallery = (props) => {
  const cardFocusHandler = (e) => {
    const clickedCardID = +e.target.id;
    const clickedCardData = props.currentCards.find(
      (card) => card.id === clickedCardID
    );
    props.dispatchCardData({
      type: "updateFocusedCard",
      data: clickedCardData,
    });
  };

  return (
    <div className={styles["card-gallery-container"]}>
      <section className={styles["card-gallery"]}>
        {!props.searchErrorStatus &&
          props.currentCards.map((card) => {
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
    </div>
  );
};

export default CardGallery;
