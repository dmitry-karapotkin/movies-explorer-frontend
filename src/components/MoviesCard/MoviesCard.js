import './MoviesCard.css';
import { useState } from 'react';
import { BASE_URL } from '../../utils/constants';

function MoviesCard ({ card, isSelected, isLiked, handleClick }) {
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
            onClick={() => handleClick({ card, baseUrl: BASE_URL, isSaved, setSaved })}
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
