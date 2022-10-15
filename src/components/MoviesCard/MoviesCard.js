import './MoviesCard.css';

function MoviesCard ({ card, isShort, isSelected }) {
  return (
    <figure className="card">
      <img className="card__image" src={card.image} alt={card.name} />
      <figcaption className="card__caption">
        <div className="card__info">
          <p className="card__title">
            {card.name}
          </p>
          <span
            className={
              `card__time card__time_type_${ isShort ? "long" : "short" }
              ${ isSelected ? "card__time_type_selected" : "" }`
            }
          />
        </div>
        <p className="card__duration">
          {card.duration}
        </p>
      </figcaption>
    </figure>
  );
}

export default MoviesCard;
