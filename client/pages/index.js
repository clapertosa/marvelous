import Banner from "../components/Banner/Banner";
import WideCardsContainer from "../components/WideCardsContainer/WideCardsContainer";
import Card from "../components/Card/Card";
import styles from "./index.scss";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles["grid-container"]}>
        <div className={styles.banner}>
          <Banner />
        </div>
        <div className={styles.characters}>
          <WideCardsContainer title="Incoming Comics">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </WideCardsContainer>
        </div>
        <div className={styles.comics}>
          <WideCardsContainer title="This Week Comics">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </WideCardsContainer>
        </div>
        <div className={styles.events}>
          <WideCardsContainer title="This Month Comics">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </WideCardsContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
