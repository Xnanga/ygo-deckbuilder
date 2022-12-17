import { useState, useEffect } from "react";

import styles from "./CardProfile.module.css";

import TitleStripBanner from "../UI/TitleStripBanner";
import CardProfileActionBar from "./CardProfileActionBar";
import CardProfileStats from "./CardProfileStats";
import CardProfileDescription from "./CardProfileDescription";
import Modal from "../UI/Modals/Modal";
import useScreenWidth from "../../hooks/use-screen-width";

const CardProfile = (props) => {
  const screenWidth = useScreenWidth(1500);
  const [modalVisible, setModalVisible] = useState(false);

  const closeModalHandler = () => {
    setModalVisible(false);
    props.cardProfileModalVisibilityHandler(false);
  };

  const createImageUrl = (cardId) => {
    return {
      large: `https://images.ygoprodeck.com/images/cards/${cardId}.jpg`,
      small: `https://images.ygoprodeck.com/images/cards_small/${cardId}.jpg`,
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

  let populatedProfileContent;

  if (props.focusedCard) {
    populatedProfileContent = (
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
          dispatchDeckData={props.dispatchDeckData}
          mainDeckData={props.mainDeckData}
          extraDeckData={props.extraDeckData}
          focusedCard={props.focusedCard}
        />
      </>
    );
  }

  useEffect(() => {
    setModalVisible(props.modalVisible);
  }, [props.modalVisible]);

  return (
    <>
      {screenWidth && (
        <section className={styles["card-profile"]}>
          {!props?.focusedCard?.id && defaultProfileContent}
          {props?.focusedCard?.id && populatedProfileContent}
        </section>
      )}
      {!screenWidth && modalVisible && (
        <Modal closeModalHandler={closeModalHandler}>
          <section className={styles["card-profile"]}>
            {!props?.focusedCard?.id && defaultProfileContent}
            {props?.focusedCard?.id && populatedProfileContent}
          </section>
        </Modal>
      )}
    </>
  );
};

export default CardProfile;
