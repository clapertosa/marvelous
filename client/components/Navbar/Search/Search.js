import React, { Component } from "react";
import styles from "./Search.scss";

class Search extends Component {
  state = {
    showSearch: false,
    category: "characters"
  };

  showSearchToggle = () => {
    this.setState(prevState => {
      return { showSearch: !prevState.showSearch };
    });
  };

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
            <span onClick={this.closeSearch}>X</span>
          </div>
          <form>
            <input type="text" name="query" placeholder="Search" />
            <div className={styles.category}>
              <a
                className={styles["category-type"]}
                onClick={() => this.setState({ category: "characters" })}
                style={
                  this.state.category === "characters" ? { color: "red" } : null
                }
              >
                Characters
              </a>
              <a
                className={styles["category-type"]}
                onClick={() => this.setState({ category: "comics" })}
                style={
                  this.state.category === "comics" ? { color: "red" } : null
                }
              >
                Comics
              </a>
              <a
                className={styles["category-type"]}
                onClick={() => this.setState({ category: "events" })}
                style={
                  this.state.category === "events" ? { color: "red" } : null
                }
              >
                Events
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
