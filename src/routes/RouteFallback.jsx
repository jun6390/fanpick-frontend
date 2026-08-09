import { useLocation } from "react-router";
import Skeleton from "../components/Skeleton/Skeleton";
import styles from "./RouteFallback.module.css";

const SKELETON_CARDS = ["pick-battle-1", "pick-battle-2"];

const PickBattleSkeleton = () => (
  <div className={`container ${styles.pickBattle}`}>
    <header className={styles.pageHeader}>
      <Skeleton.Line className={styles.eyebrow} />
      <Skeleton.Line className={styles.title} />
      <Skeleton.Line className={styles.description} />
    </header>

    <div className={styles.controlArea}>
      <Skeleton.Line className={styles.filter} />
      <Skeleton.Line className={styles.search} />
    </div>

    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <Skeleton.Line className={styles.sectionTitle} />
        <Skeleton.Line className={styles.sectionAction} />
      </div>

      <Skeleton.Line className={styles.sectionNavigation} />

      <div className={styles.cardGrid}>
        {SKELETON_CARDS.map((card) => (
          <div key={card} className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.cardTop}>
                <Skeleton.Line className={styles.categoryBadge} />
                <Skeleton.Line className={styles.roundBadge} />
              </div>

              <div className={styles.imageArea}>
                <Skeleton.Box className={styles.imageSlot} />
                <Skeleton.Line className={styles.vs} />
                <Skeleton.Box className={styles.imageSlot} />
              </div>

              <Skeleton.Line className={styles.cardTitle} />
              <Skeleton.Line className={styles.cardText} />
              <Skeleton.Line className={styles.cardTextShort} />
            </div>
            <Skeleton.Line className={styles.cardButton} />
          </div>
        ))}
      </div>
    </section>
  </div>
);

const SpinnerFallback = () => (
  <div className={styles.inner}>
    <span className={styles.spinner} aria-hidden="true" />
  </div>
);

const RouteFallback = () => {
  const { pathname } = useLocation();
  const isPickBattle = pathname.startsWith("/worldcup");

  return (
    <div
      className={`${styles.fallback} ${
        isPickBattle ? styles.pickBattleFallback : ""
      }`}
      role="status"
      aria-live="polite"
    >
      {isPickBattle ? <PickBattleSkeleton /> : <SpinnerFallback />}
      <span className={styles.label}>화면을 불러오는 중...</span>
    </div>
  );
};

export default RouteFallback;
