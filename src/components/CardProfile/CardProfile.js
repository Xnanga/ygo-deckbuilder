import { useContext } from "react";

import styles from "./CardProfile.module.css";

import TitleStripBanner from "../UI/TitleStripBanner";
import CardProfileActionBar from "./CardProfileActionBar";
import CardProfileStats from "./CardProfileStats";
import CardProfileDescription from "./CardProfileDescription";
import CardsContext from "../../Context/card-context";

const CardProfile = () => {
  const ctx = useContext(CardsContext);

  const createImageUrl = (cardId) => {
    return {
      large: `https://storage.googleapis.com/ygoprodeck.com/pics/${cardId}.jpg`,
      small: `https://storage.googleapis.com/ygoprodeck.com/pics_small/${cardId}.jpg`,
    };
  };

  const defaultProfileContent = (
    <>
      <TitleStripBanner />
      <CardProfileStats cardImgSrc="/media/icons/card-back-icon.png" />
      <TitleStripBanner />
    </>
  );

  const populatedProfileContent = (
    <>
      <TitleStripBanner
        title={ctx.focusedCard.name}
        secondaryImgSrc={`/media/icons/${ctx.focusedCard?.attribute?.toLowerCase()}-attribute-symbol.png`}
      />
      <CardProfileStats
        cardImgSrc={createImageUrl(ctx.focusedCard.id).large}
        cardImgAlt={ctx.focusedCard.name}
        cardStarLevel={ctx.focusedCard.level}
        cardAttack={ctx.focusedCard.atk}
        cardDefense={ctx.focusedCard.def}
      />
      <TitleStripBanner
        title={`${ctx.focusedCard.race}/${ctx.focusedCard.type}`}
      />
      <CardProfileDescription cardDescription={ctx.focusedCard.desc} />
      <CardProfileActionBar />
    </>
  );

  return (
    <section className={styles["card-profile"]}>
      {!ctx.focusedCard.id && defaultProfileContent}
      {ctx.focusedCard.id && populatedProfileContent}
    </section>
  );
};

export default CardProfile;
