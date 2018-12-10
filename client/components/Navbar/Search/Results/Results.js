import styles from "./Results.scss";
import ResultItem from "./ResultItem/ResultItem";

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
              image={result.thumbnail.path}
              imageExtension={result.thumbnail.extension}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Results;
