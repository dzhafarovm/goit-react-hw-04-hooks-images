import { Component } from "react";
import PropTypes from "prop-types";
import css from "./Searchbar.module.css";

export class Searchbar extends Component {
  state = {
    searchQuery: "",
  };

  getInputValue = (e) => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  formSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === "") {
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: "" });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.formSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.getInputValue}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
