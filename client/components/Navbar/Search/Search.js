import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import Results from "./Results/Results";
import Spinner from "../../UI/Spinner/Spinner";
import styles from "./Search.scss";

const SEARCH_COMIC_QUERY = gql`
  query SEARCH_COMIC_QUERY($query: String!) {
    searchComic(query: $query) {
      id
      title
      thumbnail {
        path
        extension
      }
    }
  }
`;

const SEARCH_CHARACTER_QUERY = gql`
  query SEARCH_CHARACTER_QUERY($query: String!) {
    searchCharacter(query: $query) {
      id
      name
      thumbnail {
        path
        extension
      }
    }
  }
`;

class Search extends Component {
  state = {
    showSearch: false,
    category: "characters",
    query: "",
    results: undefined,
    loading: false
  };

  showSearchToggle = () => {
    this.setState(prevState => {
      return { showSearch: !prevState.showSearch };
    });
  };

  onChangeInput = e => {
    this.setState({ query: e.target.value });
  };

  onChangeHandler = debounce(async (e, client) => {
    if (this.state.query.length <= 0) {
      return;
    }

    this.setState({ loading: true });
    if (this.state.category === "characters") {
      const res = await client.query({
        query: SEARCH_CHARACTER_QUERY,
        variables: { query: this.state.query }
      });
      this.setState({ results: res.data.searchCharacter });
    } else {
      const res = await client.query({
        query: SEARCH_COMIC_QUERY,
        variables: { query: this.state.query }
      });
      this.setState({ results: res.data.searchComic });
    }

    this.setState({ loading: false });
  }, 1500);

  closeSearch = () => {
    this.setState({ showSearch: false });
  };

  render() {
    return (
      <div className={styles.search}>
        <i className="icon-search" onClick={this.showSearchToggle} />
        <div
          className={[
            styles["search-container"],
            this.state.showSearch ? styles.display : styles.hide
          ].join(" ")}
        >
          <div className={styles.closer}>
            <i onClick={this.closeSearch} className="icon-cancel" />
          </div>
          <ApolloConsumer>
            {client => (
              <form
                method="POST"
                onChange={e => {
                  e.persist();
                  this.onChangeHandler(e, client);
                }}
              >
                <input
                  type="text"
                  autoComplete="off"
                  name="query"
                  onChange={e => this.onChangeInput(e)}
                  placeholder="Search"
                />

                <div className={styles.category}>
                  <label
                    style={
                      this.state.category === "characters"
                        ? { color: "red" }
                        : null
                    }
                  >
                    Characters
                    <input
                      name="category"
                      type="radio"
                      className={styles["category-type"]}
                      onClick={() =>
                        this.setState({
                          category: "characters"
                        })
                      }
                    />
                  </label>
                  <label
                    style={
                      this.state.category === "comics" ? { color: "red" } : null
                    }
                  >
                    Comics
                    <input
                      name="category"
                      type="radio"
                      className={styles["category-type"]}
                      onClick={() => this.setState({ category: "comics" })}
                    />
                  </label>
                </div>
              </form>
            )}
          </ApolloConsumer>
          {this.state.loading ? <Spinner /> : null}
          {!this.state.loading ? <Results data={this.state.results} /> : null}
        </div>
      </div>
    );
  }
}

export default Search;
