import styles from "./CardGallery.module.css";

import CircularButton from "../UI/Buttons/CircularButton";
import PaginationDisplay from "../UI/PaginationDisplay";

const CardGallery = () => {
  return (
    <div className={styles["card-gallery-container"]}>
      <section className={styles["card-gallery"]}>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
        <div className={styles["card-gallery__card"]}>
          <img
            className={styles["card-gallery__card-img"]}
            src="/media/images/Small Card Test.jpg"
            alt="A Small Card"
          />
        </div>
      </section>
      <div className={styles["card-gallery__pagination-controls"]}>
        <CircularButton
          imgSrc="/media/icons/left-icon.png"
          imgAlt="A Left Icon"
          onClick={console.log("Left")}
        />
        <CircularButton
          imgSrc="/media/icons/right-icon.png"
          imgAlt="A Right Icon"
          onClick={console.log("Right")}
        />
      </div>
    </div>
  );
};

export default CardGallery;
