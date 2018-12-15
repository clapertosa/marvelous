import { Query } from "react-apollo";
import gql from "graphql-tag";
import Banner from "../components/Banner/Banner";
import WideCardsContainer from "../components/WideCardsContainer/WideCardsContainer";
import Card from "../components/Card/Card";
import Spinner from "../components/UI/Spinner/Spinner";
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

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles["grid-container"]}>
        <div className={styles.banner}>
          <Banner />
        </div>
        <Query query={COMICS_QUERY}>
          {({ data: { comics }, error, loading }) => {
            if (!comics || loading) return <Spinner />;
            return (
              <>
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
                        image={comic.thumbnail.path.replace(
                          "http://",
                          "https://"
                        )}
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
                        image={comic.thumbnail.path.replace(
                          "http://",
                          "https://"
                        )}
                        imageExtension={comic.thumbnail.extension}
                      />
                    ))}
                  </WideCardsContainer>
                </div>
              </>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

export default Home;
