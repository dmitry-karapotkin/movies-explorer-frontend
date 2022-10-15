import './SearchForm.css';
import searchIconWhite from '../../images/search-icon-white.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="search-form">
      <form name="search-form" className="search-form__form">
        <input className="search-form__text-input" type="text" placeholder="Фильм" required />
        <button className="search-form__post-button">
          <img className="search-form__icon" src={searchIconWhite} alt="search-icon" />
        </button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
