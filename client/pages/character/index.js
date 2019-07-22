import Head from "next/head";
import gql from "graphql-tag";
import Poster from "../../components/Character/Poster/Poster";
import Info from "../../components/Character/Info/Info";
import WideCardsContainer from "../../components/WideCardsContainer/WideCardsContainer";
import Card from "../../components/Card/Card";
import CommentBox from "../../components/CommentBox/CommentBox";
import NotFound from "../../components/NotFound/NotFound";
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

const Character = ({ character, id, category, error }) => {
  return error ? (
    <NotFound />
  ) : (
    <>
      <Head>
        <title>{`Marvelous 🚀 | ${character.name}`}</title>
        <meta property="og:title" content={`${character.name}`} />
        <meta
          property="og:image:secure_url"
          itemProp="image"
          content={`${character.thumbnail.path.replace(
            "http://",
            "https://"
          )}/standard_xlarge.${character.thumbnail.extension}`}
        />
        {character.description ? (
          <meta property="og:description" content={character.description} />
        ) : null}
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
            <Info name={character.name} description={character.description} />
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
                  image={comic.thumbnail.path.replace("http://", "https://")}
                  imageExtension={comic.thumbnail.extension}
                />
              ))}
            </WideCardsContainer>
          </div>
          <div className={styles.comments}>
            <CommentBox categoryId={id} category={category} />
          </div>
        </div>
      </div>
    </>
  );
};

Character.getInitialProps = async ({ query, pathname, apolloClient }) => {
  let character;
  let error = false;

  try {
    character = await apolloClient.query({
      query: CHARACTER_QUERY,
      variables: { id: query.id }
    });
  } catch (e) {
    error = true;
    return { error };
  }

  return {
    character: character.data.character,
    id: query.id,
    category: pathname.substring(1)
  };
};

export { CHARACTER_QUERY };
export default Character;
