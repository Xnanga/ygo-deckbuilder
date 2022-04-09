import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const Modal = (props) => {
  const modalRoot = document.getElementById("modal-root");

  const modalLayout = (
    <aside className={styles.modal}>
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
