import styles from "./DetailElement.module.scss";

const DetailElement = ({ label, value }) => (
  <div className={styles.detailElement}>
    <span className={styles.label}>{label}:</span>
    <span className={styles.value}>{value}</span>
  </div>
);

export default DetailElement;
