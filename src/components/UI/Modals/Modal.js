import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useScreenWidth from "../../../hooks/use-screen-width";

import styles from "./Modal.module.css";

const Modal = (props) => {
  const [screenHeight, setScreenHeight] = useState(null);
  const screenWidth = useScreenWidth(1500);
  const modalRoot = document.getElementById("modal-root");

  let inlineHeightStyling = !screenWidth ? { height: `${screenHeight}px` } : {};

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenHeight(window.innerHeight);
    };

    if (!screenWidth) {
      window.addEventListener("resize", handleWindowResize);
      handleWindowResize();
    }

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [screenWidth]);

  const modalLayout = (
    <aside className={styles.modal} style={inlineHeightStyling}>
      <button
        className={styles["modal__close-btn"]}
        onClick={props.closeModalHandler}
      >
        <img src="/media/icons/cross-icon.png" alt="A Close Window Icon" />
      </button>
      <h1 className={styles["modal__heading"]}>{props.modalTitle}</h1>
      <div className={styles["modal__content"]}>{props.children}</div>
    </aside>
  );

  return ReactDOM.createPortal(modalLayout, modalRoot);
};

export default Modal;
