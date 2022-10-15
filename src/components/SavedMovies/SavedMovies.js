import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import film from '../../images/film.png';

function SavedMovies() {

  const defaultCard = {
    name: "33 слова о дизайне",
    duration: "1ч42мин",
    image: film
  };

  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList>
        {
          Array.from({ length: 6 }, (_, i) => {
            return (
              <MoviesCard
                card={defaultCard}
                isSelected={true}
                isShort={ i % 2 === 0 ? true : false }
                key={i}
              />
            );
          })
        }
      </MoviesCardList>
    </main>
  );
}

export default SavedMovies;
