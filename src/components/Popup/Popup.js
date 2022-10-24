import './Popup.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import successIcon from '../../images/success-icon.svg';
import errorIcon from '../../images/error-icon.svg';
import closeIcon from '../../images/cross-icon.svg';

function Popup ({ isPopupOpen, setPopupOpen, isSuccess, successMessage, errorMessage }) {

  const history = useHistory();

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        setPopupOpen(false)
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  function handleClose() {
    setPopupOpen(false);
    if (isSuccess && history.location.pathname === '/signup') {
      history.push('/');
    }
  };

  return (
    <section className={`popup popup_type_modal ${isPopupOpen ? "popup_opened" : ""}`} >
      <div className="popup__modal">
        <img className="popup__status-icon" src={isSuccess ? successIcon : errorIcon} alt={`статус ${isSuccess? "ок": "ошибка"}`} />
        <h2 className="popup__title">
          { isSuccess ? successMessage : errorMessage }
        </h2>
        <img className="popup__close-button" src={closeIcon} alt="закрыть" onMouseDown={handleClose}/>
      </div>
    </section>
  )
}

export default Popup;
