import ResultItem from "./ResultItem/ResultItem";
import styles from "./Results.scss";

const Results = ({ data }) => {
  if (!data) return null;
  return (
    <div className={styles.container}>
      <ul>
        {data.map(result => {
          return (
            <ResultItem
              key={result.id}
              id={result.id}
              category={result.__typename}
              name={result.name || result.title}
              image={result.thumbnail.path.replace("http://", "https://")}
              imageExtension={result.thumbnail.extension}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Results;
