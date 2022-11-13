import './MoviesCardList.css';
import { useState, useContext, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function MoviesCardList ({ moviesList, isError, isSelected, isFound, handleClick }) {
  const {
    movies,
    device,
  } = useContext(CurrentUserContext);
  const [cardsNumber, setCardsNumber] = useState(0);

  useEffect(() => {
    const numCards = moviesList.length > device.initGrid ?
                     device.initGrid : moviesList.length;
    setCardsNumber(numCards);
  }, [movies]);

  function handleLoadButtonClick (e) {
    setCardsNumber(cardsNumber + device.addCards);
  };

  function isLiked (id) {
    return movies.savedMoviesList.some((item) => {
      return item.movieId === id;
    })
  };

  return (
    <section className="card-list">
      <div className="card-list__grid">
      {
        cardsNumber > 0 ?
          moviesList.slice(0, cardsNumber).map((item) => {
            return (
              <MoviesCard
                card={item}
                isSelected={isSelected}
                isLiked={() => isLiked(item.id)}
                handleClick={handleClick}
                key={item.id || item.movieId}
              />
            )
          }) : ""
      }
      {
        !isFound && cardsNumber === 0 ? <p>Ничего не найдено.</p> : ""
      }
      </div>
      <div className="card-list__control-panel">
        {
          isError ? <p className="card-list__error-message">
            Во время запроса произошла ошибка.
            Возможно, проблема с соединением или
            сервер недоступен. Подождите немного и
            попробуйте ещё раз.
            </p> :
            ""
        }
        {
          cardsNumber < moviesList.length ?
            <button
              className="card-list__load-button"
              onClick={handleLoadButtonClick}
            >
              Ещё
            </button> :
          ""
        }
      </div>
    </section>
  );
}

export default MoviesCardList;
