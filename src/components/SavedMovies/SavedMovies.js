import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import filterMovies from '../../utils/search';
import Popup from '../Popup/Popup';

function SavedMovies() {
  const inputSearchId ="search-text-saved-movies";
  const [querySavedMoviesList, setQuerySavedMoviesList] = useState([]);
  const [isFound, setFound] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    isPopupOpen,
    setPopupOpen,
    setLoading,
    queryText,
    savedMoviesList,
    toggleState,
  } = useContext(CurrentUserContext);

  function handleSearchSubmit (e) {
    e.preventDefault();
    if (queryText[inputSearchId]) {
      setLoading(true);
      const filteredMovies = filterMovies(
        savedMoviesList,
        queryText[inputSearchId],
        toggleState[inputSearchId]
      );
      setFound(filteredMovies.length > 0);
      setQuerySavedMoviesList(filteredMovies);
      setLoading(false);
    } else {
      setErrorMessage("Нужно ввести ключевое слово");
      setPopupOpen(true);
    }
  }

  useEffect(() => {
    setQuerySavedMoviesList(
      filterMovies(
        savedMoviesList,
        queryText[inputSearchId],
        toggleState[inputSearchId]
      )
    );
  }, [savedMoviesList]);

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        inputId={inputSearchId}
      />
      <MoviesCardList
        cardList={querySavedMoviesList}
        isError={false}
        isSelected={true}
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

export default SavedMovies;
