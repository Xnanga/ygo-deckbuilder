import ReactDOM from "react-dom";

import styles from "./MiniModal.module.css";

const MiniModal = (props) => {
  const miniModalRoot = document.getElementById("mini-modal-root");

  const buttonsContent = props.buttonsData.map((button) => {
    let buttonClass = styles["mini-modal__btn"];

    if (button.additionalClass) {
      if (button.additionalClass === "green") {
        buttonClass = `${styles["mini-modal__btn"]} ${styles["mini-modal__btn--green"]}`;
      }
      if (button.additionalClass === "red") {
        buttonClass = `${styles["mini-modal__btn"]} ${styles["mini-modal__btn--red"]}`;
      }
    }

    return (
      <button
        key={button.id}
        className={buttonClass}
        value={button.value}
        onClick={() => props.buttonAction(button.value)}
      >
        {button.label}
      </button>
    );
  });

  const miniModalLayout = (
    <div className={styles["mini-modal-container"]}>
      <aside className={styles["mini-modal"]}>
        <p className={styles["mini-modal__message"]}>{props.message}</p>
        <div className={styles["mini-modal__btn-container"]}>
          {buttonsContent}
        </div>
      </aside>
    </div>
  );

  return ReactDOM.createPortal(miniModalLayout, miniModalRoot);
};

export default MiniModal;
