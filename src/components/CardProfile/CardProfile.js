import styles from "./CardProfile.module.css";

import TitleStripBanner from "../UI/TitleStripBanner";
import CardProfileActionBar from "./CardProfileActionBar";
import CardProfileStats from "./CardProfileStats";
import CardProfileDescription from "./CardProfileDescription";

const CardProfile = (props) => {
  const createImageUrl = (cardId) => {
    return {
      large: `https://storage.googleapis.com/ygoprodeck.com/pics/${cardId}.jpg`,
      small: `https://storage.googleapis.com/ygoprodeck.com/pics_small/${cardId}.jpg`,
    };
  };

  const determineSecondaryImg = (type) => {
    if (type === "Spell Card") return "spell";
    if (type === "Trap Card") return "trap";
    return props.focusedCard?.attribute?.toLowerCase();
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
        title={props.focusedCard.name}
        secondaryImgSrc={`/media/icons/${determineSecondaryImg(
          props.focusedCard.type
        )}-attribute-symbol.png`}
        cardType={props.focusedCard.type}
      />
      <CardProfileStats
        cardImgSrc={createImageUrl(props.focusedCard.id).large}
        cardImgAlt={props.focusedCard.name}
        cardStarLevel={props.focusedCard.level}
        cardRank="TEST"
        cardAttack={props.focusedCard.atk}
        cardDefense={props.focusedCard.def}
        cardType={props.focusedCard.type}
        cardRace={props.focusedCard.race}
        cardLinkValue={props.focusedCard.linkval}
      />
      <TitleStripBanner
        title={`${props.focusedCard.race}/${props.focusedCard.type}`}
        cardType={props.focusedCard.type}
      />
      <CardProfileDescription cardDescription={props.focusedCard.desc} />
      <CardProfileActionBar
        bookmarkedCards={props.bookmarkedCards}
        dispatchCardData={props.dispatchCardData}
        focusedCard={props.focusedCard}
      />
    </>
  );

  return (
    <section className={styles["card-profile"]}>
      {!props.focusedCard.id && defaultProfileContent}
      {props.focusedCard.id && populatedProfileContent}
    </section>
  );
};

export default CardProfile;
