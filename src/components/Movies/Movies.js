import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useContext } from 'react';
import { api } from '../../utils/MoviesApi';
import { api as mainApi } from '../../utils/MainApi';
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
    isSuccess,
    setSuccess,
    moviesList,
    setMoviesList,
    savedMoviesList,
    setSavedMoviesList,
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

  function handleSaveClick ({ card, baseUrl, isSaved, setSaved }) {
    const movie = {
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: baseUrl + card.image.url,
      trailerLink: card.trailerLink,
      thumbnail: baseUrl + card.image.formats.thumbnail.url,
      movieId: card.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
    };

    if (isSaved) {
      mainApi.deleteMovie(movie.movieId)
        .then((_) => {
          setSavedMoviesList(savedMoviesList.filter(item => item.movieId !== movie.movieId));
          setSaved(false);
        })
        .catch(err => {
          setErrorMessage(err);
          setSuccess(false);
          setPopupOpen(true);
        })
    } else {
      mainApi.postMovie(movie)
        .then((data) => {
          if (data) {
            setSavedMoviesList([...savedMoviesList, data]);
            setSaved(true);
          }
        })
        .catch(err => {
          setErrorMessage(err);
          setSuccess(false);
          setPopupOpen(true);
        })
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
        handleClick={handleSaveClick}
        isError={isError}
        isSelected={false}
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

export default Movies;
