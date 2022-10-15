import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import { useState } from 'react';

function MoviesCardList ({ children }) {

  const [isLoading, setIsLoading] = useState(false);

  function handleLoadButtonClick () {
    setIsLoading(true);
  }

  return (
    <section className="card-list">
      <div className="card-list__grid">
        {children}
      </div>
      <div className="card-list__control-panel">
        { isLoading ?
          <Preloader /> :
          <button
            className="card-list__load-button"
            onClick={handleLoadButtonClick}
          >
            Ещё
          </button>
        }
      </div>
    </section>
  );
}

export default MoviesCardList;
