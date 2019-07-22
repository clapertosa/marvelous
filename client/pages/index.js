import gql from "graphql-tag";
import Banner from "../components/Banner/Banner";
import WideCardsContainer from "../components/WideCardsContainer/WideCardsContainer";
import Card from "../components/Card/Card";
import styles from "./index.scss";

const COMICS_QUERY = gql`
  query COMICS_QUERY {
    comics {
      lastWeek {
        id
        title
        thumbnail {
          path
          extension
        }
      }
      thisMonth {
        id
        title
        thumbnail {
          path
          extension
        }
      }
    }
  }
`;

const Home = ({ comics }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles["grid-container"]}>
        <div className={styles.banner}>
          <Banner />
        </div>
        <div className={styles["last-week"]}>
          <WideCardsContainer
            title="Last Week"
            autoplay={{ delay: 4000 }}
            cardsNumber={comics.lastWeek.length}
            slidesPerView={5}
            allowTouchMove
            loop
          >
            {comics.lastWeek.map(comic => (
              <Card
                key={comic.title}
                url="comic"
                id={comic.id}
                title={comic.title}
                image={comic.thumbnail.path.replace("http://", "https://")}
                imageExtension={comic.thumbnail.extension}
              />
            ))}
          </WideCardsContainer>
        </div>
        <div className={styles["this-month"]}>
          <WideCardsContainer
            title="This Month"
            autoplay={{ delay: 4000 }}
            cardsNumber={comics.thisMonth.length}
            slidesPerView={5}
            allowTouchMove
            loop
          >
            {comics.thisMonth.map(comic => (
              <Card
                key={comic.title}
                url="comic"
                id={comic.id}
                title={comic.title}
                image={comic.thumbnail.path.replace("http://", "https://")}
                imageExtension={comic.thumbnail.extension}
              />
            ))}
          </WideCardsContainer>
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async context => {
  const {
    data: { comics }
  } = await context.apolloClient.query({ query: COMICS_QUERY });
  return { comics };
};

export default Home;
