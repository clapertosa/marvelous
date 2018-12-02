import Carousel from "../Carousel/Carousel";
import styles from "./Banner.scss";

const Banner = () => {
  const banner = [
    "/static/backgrounds/banner0.jpg",
    "/static/backgrounds/banner1.jpg",
    "/static/backgrounds/banner2.jpg",
    "/static/backgrounds/banner3.jpg"
  ];
  return (
    <div className={styles.container}>
      <Carousel
        autoplay
        pauseOnHover={false}
        speed={1800}
        transitionMode="fade"
        infinite
        withoutControls
      >
        {banner.map((image, index) => (
          <img key={index} src={image} />
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
