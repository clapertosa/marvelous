import { Query } from "react-apollo";
import Head from "next/head";
import gql from "graphql-tag";
import Poster from "../../components/Character/Poster/Poster";
import Info from "../../components/Character/Info/Info";
import WideCardsContainer from "../../components/WideCardsContainer/WideCardsContainer";
import Card from "../../components/Card/Card";
import CommentBox from "../../components/CommentBox/CommentBox";
import Spinner from "../../components/UI/Spinner/Spinner";
import styles from "./index.scss";

const CHARACTER_QUERY = gql`
  query CHARACTER_QUERY($id: ID!) {
    character(id: $id) {
      id
      name
      description
      thumbnail {
        path
        extension
      }
      comics {
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

const Character = props => {
  return (
    <Query query={CHARACTER_QUERY} variables={{ id: props.id }}>
      {({ data: { character }, error, loading }) => {
        if (loading)
          return <Spinner centered spinnerWidth={300} spinnerHeight={300} />;
        return (
          <>
            <Head>
              <title>{`Marvelous 🚀 | ${character.name}`}</title>
              <meta
                property="og:title"
                content={`Marvelous 🚀 | ${character.name}`}
              />
              <meta
                property="og:image"
                content={`${character.thumbnail.path.replace(
                  "http://",
                  "https://"
                )}/standard_large.${character.thumbnail.extension}`}
              />
            </Head>
            <div className={styles.wrapper}>
              <div
                className={styles["background-image-container"]}
                style={{
                  backgroundImage: `url('${character.thumbnail.path.replace(
                    "http://",
                    "https://"
                  )}/background.${character.thumbnail.extension}')`
                }}
              />
              <div className={styles["grid-container"]}>
                <div className={styles.poster}>
                  <Poster
                    image={`${character.thumbnail.path.replace(
                      "http://",
                      "https://"
                    )}.${character.thumbnail.extension}`}
                  />
                </div>
                <div className={styles.info}>
                  <Info
                    name={character.name}
                    description={character.description}
                  />
                </div>
                <div className={styles.characters}>
                  <WideCardsContainer
                    title="Appears in"
                    allowTouchMove
                    loop
                    autoplay={character.comics.length > 5}
                    slidesPerView={
                      character.comics.length > 5 ? 5 : character.comics.length
                    }
                    cardsNumber={character.comics.length}
                  >
                    {character.comics.map(comic => (
                      <Card
                        key={comic.id}
                        url="comic"
                        id={comic.id}
                        title={comic.name}
                        image={comic.thumbnail.path.replace(
                          "http://",
                          "https://"
                        )}
                        imageExtension={comic.thumbnail.extension}
                      />
                    ))}
                  </WideCardsContainer>
                </div>
                <div className={styles.comments}>
                  <CommentBox categoryId={props.id} category={props.category} />
                </div>
              </div>
            </div>
          </>
        );
      }}
    </Query>
  );
};

Character.getInitialProps = ({ query, pathname }) => {
  return { id: query.id, category: pathname.substring(1) };
};

export default Character;
