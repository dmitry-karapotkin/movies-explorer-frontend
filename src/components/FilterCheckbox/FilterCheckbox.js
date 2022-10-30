import './FilterCheckbox.css';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import filterMovies from '../../utils/search';

function FilterCheckbox({ toggleId, cards }) {
  const {
    movies,
    setMovies,
   } = useContext(CurrentUserContext);
   const [toggle, setToggle] = useState(movies.toggle[toggleId]);

  function handleToggleChange (e) {
    setToggle(e.target.checked);
  }

  useEffect(() => {
    setMovies({
      type: "update",
      key: "toggle",
      id: toggleId,
      value: toggle
    })
    let filteredMovies;
    if (toggle) {
      filteredMovies = filterMovies(
        cards,
        movies.query[toggleId],
        toggle
      );
    } else if (movies.query[toggleId]) {
      filteredMovies = filterMovies(
        cards,
        movies.query[toggleId],
        toggle
      );
    } else if (toggleId === "savedMoviesListQuery") {
      filteredMovies = movies.savedMoviesList;
    } else {
      filteredMovies = [];
    }
    setMovies({
      type: "update",
      key: toggleId,
      value: filteredMovies
    })
  }, [toggle]);

  return (
    <div className="toggle">
      <label className="toggle__button">
        <input
          id={toggleId}
          type="checkbox"
          className="toggle__box"
          onChange={handleToggleChange}
          defaultChecked={toggle}
        />
        <span className="toggle__slider"></span>
      </label>
      <span className="toggle__label">
        Короткометражки
      </span>
    </div>
  );
}

export default FilterCheckbox;
