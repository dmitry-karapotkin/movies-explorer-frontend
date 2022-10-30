import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import filterMovies from '../../utils/search';
import Popup from '../Popup/Popup';
import { api as mainApi } from '../../utils/MainApi';

function SavedMovies() {
  const inputSearchId ="savedMoviesListQuery";
  const {
    movies,
    setMovies,
    isPopupOpen,
    setPopupOpen,
    isSuccess,
    setSuccess,
    setLoading,
  } = useContext(CurrentUserContext);
  const initIsFound = movies.query[inputSearchId] ?
                      movies.savedMoviesListQuery.length > 0 : true;
  const [isFound, setFound] = useState(initIsFound);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleSearchSubmit (e, queryText) {
    e.preventDefault();
    if (queryText) {
      setLoading(true);
      setError(false);
      const filteredMovies = filterMovies(
        movies.savedMoviesList,
        queryText,
        movies.toggle[inputSearchId]
      );
      setFound(filteredMovies.length > 0);
      setMovies({
        type: "update",
        key: inputSearchId,
        value: filteredMovies
      });
      setLoading(false);
    } else {
      setErrorMessage("Нужно ввести ключевое слово");
      setPopupOpen(true);
    }
  }

  function handleDeleteClick ({ card }) {
    mainApi.deleteMovie(card.movieId)
      .then((_) => {
        setMovies(
          {
            type: "update",
            key: "savedMoviesList",
            value: movies.savedMoviesList.filter(item => item.movieId !== card.movieId)
          }
        );
        setMovies(
          {
            type: "update",
            key: inputSearchId,
            value: movies.savedMoviesListQuery.filter(item => item.movieId !== card.movieId)
          }
        )
      })
      .catch(err => {
        console.log(err);
        setErrorMessage(err);
        setSuccess(false);
        setPopupOpen(false);
      })
  };

  useEffect(() => {
    mainApi.getMovies()
      .then((data) => {
        setMovies({
          type: "update",
          key: "savedMoviesList",
          value: data
        });
        if (!movies.query[inputSearchId]) {
          setMovies({
            type: "update",
            key: inputSearchId,
            value: data
          })
        };
      })
  }, []);

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        inputId={inputSearchId}
        cards={movies.savedMoviesList}
      />
      <MoviesCardList
        moviesList={movies.savedMoviesListQuery}
        handleClick={handleDeleteClick}
        isError={isError}
        isSelected={true}
        isFound={isFound}
      />
      <Popup
        isSuccess={isSuccess}
        setPopupOpen={setPopupOpen}
        isPopupOpen={isPopupOpen}
        errorMessage={errorMessage}
      />
    </main>
  );
}

export default SavedMovies;
