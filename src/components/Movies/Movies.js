import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useContext, useEffect } from 'react';

import { api as mainApi } from '../../utils/MainApi';
import { api as moviesApi } from '../../utils/MoviesApi';
import filterMovies from '../../utils/search';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Popup from '../Popup/Popup';

function Movies() {
  const inputSearchId = "moviesListQuery";
  const {
    movies,
    setMovies,
    isPopupOpen,
    setPopupOpen,
    setLoading,
    isSuccess,
    setSuccess,
  } = useContext(CurrentUserContext);

  const initIsFound = movies.query[inputSearchId] ?
                      movies.moviesListQuery.length > 0 : true;
  const [isError, setError] = useState(false);
  const [isFound, setFound] = useState(initIsFound);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    moviesApi.getMovies()
      .then((data) => {
        setMovies({
          type: "update",
          key: "moviesList",
          value: data
        })
      })
      .catch(err => console.log(err));
    mainApi.getMovies()
      .then((data) => {
        setMovies({
          type: "update",
          key: "savedMoviesList",
          value: data
        });
      })
      .catch(err => console.log(err));
  }, []);

  function handleSearchSubmit (e, queryText) {
    e.preventDefault();
    if (queryText) {
      setLoading(true);
      setError(false);
      const filteredMovies = filterMovies(
        movies.moviesList,
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
          setMovies(
            {
              type: "update",
              key: "savedMoviesList",
              value: movies.savedMoviesList.filter(item => item.movieId !== movie.movieId)
            }
          )
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
            setMovies(
              {
                type: "update",
                key: "savedMoviesList",
                value: [...movies.savedMoviesList, data]
              }
            )
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
        cards={movies.moviesList}
      />
      <MoviesCardList
        moviesList={movies.moviesListQuery}
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
