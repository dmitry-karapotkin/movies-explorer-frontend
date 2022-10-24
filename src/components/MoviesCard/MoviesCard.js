import './MoviesCard.css';
import { useState, useContext } from 'react';
import { api } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { BASE_URL } from '../../utils/constants';

function MoviesCard ({ card, isSelected, isLiked }) {
  const {
    savedMoviesList,
    setSavedMoviesList,
  } = useContext(CurrentUserContext);
  const [isSaved, setSaved] = useState(isLiked);

  const cardImage = isSelected ? card.image : BASE_URL + card.image.url;

  function getHoursMinutes(duration) {
    let hour = 0;
    let minute = 0;
    if (duration < 60) {
      minute = duration;
    } else {
      hour = Math.floor(duration / 60);
      minute = duration % 60;
    }
    return hour + "ч" + minute + "мин";
  }

  function handleSaveClick (e) {
    const movie = {
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: BASE_URL + card.image.url,
      trailerLink: card.trailerLink,
      thumbnail: BASE_URL + card.image.formats.thumbnail.url,
      movieId: card.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
    };

    if (isSaved) {
      api.deleteMovie(movie.movieId)
        .then((_) => {
          setSavedMoviesList(savedMoviesList.filter(item => item.movieId !== movie.movieId));
          setSaved(false);
        })
    } else {
      api.postMovie(movie)
        .then((data) => {
          setSavedMoviesList([...savedMoviesList, data]);
          setSaved(true);
        })
    }
  }

  function handleDeleteClick (e) {
    api.deleteMovie(card.movieId)
      .then((_) => {
        setSavedMoviesList(savedMoviesList.filter(item => item.movieId !== card.movieId));
      })
  };

  return (
    <figure className="card">
      <a href={card.trailerLink} target="_blank">
        <img className="card__image" src={cardImage} alt={card.nameEN} />
      </a>
      <figcaption className="card__caption">
        <div className="card__info">
          <p className="card__title">
            {card.nameRU}
          </p>
          <span
            className={
              `card__time ${ isSelected ? "card__time_type_selected" : "" }
              ${ isSaved ? "card__time_type_short" : "card__time_type_long" }`
            }
            onClick={ isSelected ? handleDeleteClick: handleSaveClick }
          />
        </div>
        <p className="card__duration">
          {getHoursMinutes(card.duration)}
        </p>
      </figcaption>
    </figure>
  );
}

export default MoviesCard;
