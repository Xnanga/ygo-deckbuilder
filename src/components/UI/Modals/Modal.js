import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useScreenWidth from "../../../hooks/use-screen-width";

import styles from "./Modal.module.css";

const Modal = (props) => {
  const [screenHeight, setScreenHeight] = useState(null);
  const screenWidth = useScreenWidth(1500);
  const modalRoot = document.getElementById("modal-root");

  let inlineHeightStyling = !screenWidth
    ? { height: `${screenHeight - 40}px` }
    : {};

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
    <div className={styles["modal__container"]}>
      <aside className={styles.modal} style={inlineHeightStyling}>
        <button
          className={styles["modal__close-btn"]}
          onClick={props.closeModalHandler}
        >
          <img src="/media/icons/cross-icon.png" alt="A Close Window Icon" />
        </button>
        {props.modalTitle && (
          <h1 className={styles["modal__heading"]}>{props.modalTitle}</h1>
        )}
        {props.modalTagline && (
          <p className={styles["modal__tagline"]}>{props.modalTagline}</p>
        )}
        <div className={styles["modal__content-container"]}>
          {props.children}
        </div>
      </aside>
    </div>
  );

  return ReactDOM.createPortal(modalLayout, modalRoot);
};

export default Modal;
