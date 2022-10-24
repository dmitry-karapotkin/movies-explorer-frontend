import './SearchForm.css';
import searchIconWhite from '../../images/search-icon-white.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SearchForm({ handleSearchSubmit, inputId }) {
  const {
    values,
    queryText,
    setQueryText,
    handleChange,
  } = useContext(CurrentUserContext);

  useEffect(() => {
    setQueryText(
      {
        ...queryText,
        [inputId]: values[inputId] || '',
      }
    );
  }, [setQueryText, values]);

  return (
    <section className="search-form">
      <form name="search-form" className="search-form__form" onSubmit={handleSearchSubmit}>
        <input
          id={inputId}
          className="search-form__text-input"
          type="text"
          placeholder="Фильм"
          value={values[inputId] || ""}
          onChange={handleChange}
        />
        <button className="search-form__post-button">
          <img className="search-form__icon" src={searchIconWhite} alt="search-icon" />
        </button>
      </form>
      <FilterCheckbox toggleId={inputId}/>
    </section>
  );
}

export default SearchForm;
