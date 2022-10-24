import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useContext } from 'react';
import { api } from '../../utils/MoviesApi';
import filterMovies from '../../utils/search';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Popup from '../Popup/Popup';

function Movies() {
  const inputSearchId = "search-text-movies";
  const [isError, setError] = useState(false);
  const [isFound, setFound] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    isPopupOpen,
    setPopupOpen,
    setLoading,
    moviesList,
    setMoviesList,
    queryText,
    toggleState,
  } = useContext(CurrentUserContext);

  function handleSearchSubmit (e) {
    e.preventDefault();
    if (queryText[inputSearchId]) {
      setLoading(true);
      setError(false);
      api.getMovies()
      .then((data) => {
        const filteredMovies = filterMovies(
          data,
          queryText[inputSearchId],
          toggleState[inputSearchId]
        );
        setFound(filteredMovies.length > 0);
        setMoviesList(filteredMovies);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
    } else {
      setErrorMessage("Нужно ввести ключевое слово");
      setPopupOpen(true);
    }
  }

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        inputId={inputSearchId}
      />
      <MoviesCardList
        cardList={moviesList}
        isError={isError}
        isSelected={false}
        isFound={isFound}
      />
      <Popup
        isSuccess={false}
        setPopupOpen={setPopupOpen}
        isPopupOpen={isPopupOpen}
        errorMessage={errorMessage}
      />
    </main>
  );
}

export default Movies;
