import React, { useState } from "react";

const CardsContext = React.createContext({
  focusedCard: {},
  modalVisible: "",
  setFocusedCard: () => {},
  setModalVisible: () => {},
});

export const CardsContextProvider = (props) => {
  const [focusedCard, setFocusedCard] = useState({});
  const [modalVisible, setModalVisible] = useState(null);

  return (
    <CardsContext.Provider
      value={{
        focusedCard: focusedCard,
        modalVisible: modalVisible,
        setFocusedCard: setFocusedCard,
        setModalVisible: setModalVisible,
      }}
    >
      {props.children}
    </CardsContext.Provider>
  );
};

export default CardsContext;
