import styles from "./RouteFallback.module.css";

const RouteFallback = () => (
  <div className={styles.fallback} role="status" aria-live="polite">
    <div className={styles.inner}>
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.track} aria-hidden="true" />
    </div>
    <span className={styles.label}>화면을 불러오는 중...</span>
  </div>
);

export default RouteFallback;
