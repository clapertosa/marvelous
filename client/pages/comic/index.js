import Head from "next/head";
import gql from "graphql-tag";
import Cover from "../../components/Comic/Cover/Cover";
import Info from "../../components/Comic/Info/Info";
import WideCardsContainer from "../../components/WideCardsContainer/WideCardsContainer";
import Card from "../../components/Card/Card";
import CommentBox from "../../components/CommentBox/CommentBox";
import NotFound from "../../components/NotFound/NotFound";
import styles from "./index.scss";

const COMIC_QUERY = gql`
  query COMIC_QUERY($id: ID!) {
    comic(id: $id) {
      title
      description
      urls {
        url
      }
      creators {
        items {
          name
          role
        }
      }
      dates {
        type
        date
      }
      prices {
        type
        price
      }
      thumbnail {
        path
        extension
      }
      characters {
        id
        name
        thumbnail {
          path
          extension
        }
      }
    }
  }
`;

const Comic = ({ comic, id, category, error }) => {
  const release = comic.dates.filter(date => date.type === "onsaleDate")[0];
  const price = comic.prices.filter(price => price.type === "printPrice")[0];
  const writer = comic.creators.items.filter(
    creator =>
      creator.role === "writer" ||
      creator.role === "letterer" ||
      creator.role === "penciler" ||
      creator.role === "penciller"
  )[0];
  const coverArtist = comic.creators.items.filter(
    creator =>
      creator.role === "penciler (cover)" ||
      creator.role === "penciller (cover)" ||
      creator.role === "painter (cover)" ||
      creator.role === "colorist (cover)" ||
      creator.role === "inker (cover)" ||
      creator.role === "inker"
  )[0];
  return error ? (
    <NotFound />
  ) : (
    <>
      <Head>
        <title>{`Marvelous 🚀 | ${comic.title}`}</title>
        <meta property="og:title" content={`${comic.title}`} />
        <meta
          property="og:image:secure_url"
          itemProp="image"
          content={`${comic.thumbnail.path.replace(
            "http://",
            "https://"
          )}/standard_xlarge.${comic.thumbnail.extension}`}
        />
        {comic.description ? (
          <meta property="og:description" content={comic.description} />
        ) : null}
      </Head>
      <div className={styles.wrapper}>
        <div
          className={styles["background-image-container"]}
          style={{
            backgroundImage: `url('${comic.thumbnail.path.replace(
              "http://",
              "https://"
            )}/background.${comic.thumbnail.extension}')`
          }}
        />
        <div className={styles["grid-container"]}>
          <div className={styles.cover}>
            <Cover
              image={`${comic.thumbnail.path.replace(
                "http://",
                "https://"
              )}/clean.${comic.thumbnail.extension}`}
            />
          </div>
          <div className={styles.info}>
            <Info
              title={comic.title}
              release={release ? release.date : "TBA"}
              price={price ? price.price : null}
              writer={writer ? writer.name : "Unknown"}
              coverArtist={coverArtist ? coverArtist.name : "The Universe 🌃"}
              description={comic.description}
            />
          </div>
          <div className={styles.characters}>
            <WideCardsContainer
              title="Characters"
              allowTouchMove
              loop
              autoplay={comic.characters.length > 5}
              slidesPerView={
                comic.characters.length > 5 ? 5 : comic.characters.length
              }
              cardsNumber={comic.characters.length}
            >
              {comic.characters.map(character => (
                <Card
                  key={character.id}
                  url="character"
                  id={character.id}
                  title={character.name}
                  image={character.thumbnail.path.replace(
                    "http://",
                    "https://"
                  )}
                  imageExtension={character.thumbnail.extension}
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

Comic.getInitialProps = async ({ query, pathname, apolloClient }) => {
  let comic;
  let error = false;

  try {
    comic = await apolloClient.query({
      query: COMIC_QUERY,
      variables: { id: query.id }
    });
  } catch (e) {
    error = true;
    return { error };
  }

  return {
    comic: comic.data.comic,
    id: query.id,
    category: pathname.substring(1)
  };
};

export { COMIC_QUERY };
export default Comic;
