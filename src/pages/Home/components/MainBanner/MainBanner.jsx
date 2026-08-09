import mainBannerAvif960 from "../../../../assets/images/fanpick_banner-960.avif";
import mainBannerAvif1440 from "../../../../assets/images/fanpick_banner-1440.avif";
import mainBannerAvif1920 from "../../../../assets/images/fanpick_banner-1920.avif";
import mainBannerImage from "../../../../assets/images/fanpick_banner.jpg";
import mainBannerWebp960 from "../../../../assets/images/fanpick_banner-960.webp";
import mainBannerWebp1440 from "../../../../assets/images/fanpick_banner-1440.webp";
import mainBannerWebp1920 from "../../../../assets/images/fanpick_banner-1920.webp";
import styles from "./MainBanner.module.css";

const MainBanner = () => {
  return (
    <section className={styles.mainBanner} data-main-banner>
      <picture className={styles.bannerPicture}>
        <source
          type="image/avif"
          srcSet={`${mainBannerAvif960} 960w, ${mainBannerAvif1440} 1440w, ${mainBannerAvif1920} 1920w`}
          sizes="100vw"
        />

        <source
          type="image/webp"
          srcSet={`${mainBannerWebp960} 960w, ${mainBannerWebp1440} 1440w, ${mainBannerWebp1920} 1920w`}
          sizes="100vw"
        />

        <img
          src={mainBannerImage}
          alt="야구, 축구, e스포츠 경기장을 표현한 FanPick 메인 배너"
          className={styles.bannerImage}
          width="1919"
          height="820"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className={styles.overlay} />

      <h1 className={styles.bannerTitle}>
        <span className={styles.match}>FANPICK</span>
        <span className={styles.game}>MATCH DAY</span>
      </h1>
    </section>
  );
};

export default MainBanner;
