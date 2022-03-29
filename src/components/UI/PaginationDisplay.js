import styles from "./PaginationDisplay.module.css";

const PaginationDisplay = (props) => {
  const pageDataAvailable = props.currentPage && props.totalPages;

  return (
    <>
      {pageDataAvailable && (
        <span className={styles["pagination-text"]}>
          Page {props.currentPage} of {props.totalPages}
        </span>
      )}
    </>
  );
};

export default PaginationDisplay;
