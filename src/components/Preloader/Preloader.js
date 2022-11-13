import React, { useEffect } from 'react';
import './Preloader.css';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Preloader ({ pageInitializing }) {
  const { isLoading } = useContext(CurrentUserContext);

  useEffect(() => {
    if (isLoading) {
      document.querySelector(".preloader_type_wide").classList.add("preloader_type_active");
    } else {
      document.querySelector(".preloader_type_wide").classList.remove("preloader_type_active");
    };
  }, [isLoading]);

  return (
      <div className={`preloader ${ pageInitializing && "preloader_type_wide" } preloader_type_active`} >
          <div className="preloader__container">
              <span className="preloader__round"></span>
          </div>
      </div>
  )
};

export default Preloader;


