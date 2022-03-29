import React, { useState } from "react";

const CardsContext = React.createContext({
  focusedCard: {},
  setFocusedCard: () => {},
});

export const CardsContextProvider = (props) => {
  const [focusedCard, setFocusedCard] = useState({});

  return (
    <CardsContext.Provider
      value={{
        focusedCard: focusedCard,
        setFocusedCard: setFocusedCard,
      }}
    >
      {props.children}
    </CardsContext.Provider>
  );
};

export default CardsContext;
