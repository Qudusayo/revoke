import styles from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.Loader}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
}
