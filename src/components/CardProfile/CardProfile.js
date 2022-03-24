import { useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";

import styles from "./CardProfile.module.css";

import TitleStripBanner from "../UI/TitleStripBanner";
import CardProfileActionBar from "./CardProfileActionBar";
import CardProfileStats from "./CardProfileStats";
import CardProfileDescription from "./CardProfileDescription";

const CardProfile = (props) => {
  const [cardData, setCardData] = useState(null);
  const { data, loading, error } = useHTTP({
    url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Doomking Balerdroch`,
  });

  useEffect(() => {
    setCardData(data);
  }, [data]);

  const createImageUrl = (cardId) => {
    return {
      large: `https://storage.googleapis.com/ygoprodeck.com/pics/${cardId}.jpg`,
      small: `https://storage.googleapis.com/ygoprodeck.com/pics_small/${cardId}.jpg`,
    };
  };

  console.log(cardData);

  return (
    <section className={styles["card-profile"]}>
      {cardData && (
        <>
          <TitleStripBanner
            title={cardData.name}
            secondaryImgSrc={`/media/icons/${cardData.attribute.toLowerCase()}-attribute-symbol.png`}
          />
          <CardProfileStats
            cardImgSrc={createImageUrl(cardData.id).large}
            cardImgAlt={cardData.name}
            cardStarLevel={cardData.level}
            cardAttack={cardData.atk}
            cardDefense={cardData.def}
          />
          <TitleStripBanner title={`${cardData.race}/${cardData.type}`} />
          <CardProfileDescription cardDescription={cardData.desc} />
          <CardProfileActionBar />
        </>
      )}
    </section>
  );
};

export default CardProfile;
