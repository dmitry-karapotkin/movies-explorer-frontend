import './SearchForm.css';
import searchIconWhite from '../../images/search-icon-white.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SearchForm({ handleSearchSubmit, inputId, cards }) {
  const {
    movies,
    setMovies,
  } = useContext(CurrentUserContext);
  const [queryText, setQueryText] = useState(movies.query[inputId]);

  function handleChange(e) {
    setQueryText(e.target.value);
  };

  function handleSubmit(e) {
    setMovies({
      type: "update",
      key: "query",
      id: inputId,
      value: queryText,
    });
    handleSearchSubmit(e, queryText);
  }

  return (
    <section className="search-form">
      <form name="search-form" className="search-form__form" onSubmit={handleSubmit}>
        <input
          id={inputId}
          className="search-form__text-input"
          type="text"
          placeholder="Фильм"
          value={queryText || ''}
          onChange={handleChange}
        />
        <button className="search-form__post-button">
          <img className="search-form__icon" src={searchIconWhite} alt="search-icon" />
        </button>
      </form>
      <FilterCheckbox
        toggleId={inputId}
        cards={cards}
      />
    </section>
  );
}

export default SearchForm;
