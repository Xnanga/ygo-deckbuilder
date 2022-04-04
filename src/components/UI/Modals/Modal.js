import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const Modal = (props) => {
  const modalRoot = document.getElementById("modal-root");
  const modalLayout = (
    <aside className={styles.modal}>
      <h2 className={styles["modal__heading"]}>{props.modalTitle}</h2>
      <div className={styles["modal__content"]}>{props.modalContent}</div>
    </aside>
  );

  return ReactDOM.createPortal(modalLayout, modalRoot);
};

export default Modal;
