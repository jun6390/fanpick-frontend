import Skeleton from "../components/Skeleton/Skeleton";
import styles from "./RouteFallback.module.css";

const RouteFallback = () => (
  <div className={styles.fallback} role="status" aria-live="polite">
    <div className={styles.inner}>
      <Skeleton.Line className={styles.kicker} />
      <Skeleton.Line className={styles.title} />
      <Skeleton.Box className={styles.panel} />
    </div>
    <span className={styles.label}>화면을 불러오는 중...</span>
  </div>
);

export default RouteFallback;
