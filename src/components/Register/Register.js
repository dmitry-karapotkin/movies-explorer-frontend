import './Register.css';
import mainLogo from '../../images/logo.svg';
import FormInput from '../FormInput/FormInput';
import Popup from '../Popup/Popup';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MainApi';

function Register() {
  const formName = "register-form";
  const {
    values,
    errors,
    setErrors,
    isValid,
    isPopupOpen,
    setPopupOpen,
    isSuccess,
    setSuccess,
  } = useContext(CurrentUserContext);

  function handleSubmit (e) {
    e.preventDefault();
    api.register({
      username: values["register-name"],
      email: values["register-email"],
      password: values["register-password"],
    })
      .then((data) => {
        if (data.email) {
          setSuccess(true);
          setPopupOpen(true);
        }
      })
      .catch(err => {
        setErrors({
          ...errors,
          "register-password": err,
        });
        setSuccess(false);
        setPopupOpen(true);
      })
  }

  return (
    <main className="register">
      <img
        className="register__logo"
        src={mainLogo}
        alt="site-logo"
      />
      <h2 className="register__welcome-text">
        Добро пожаловать!
      </h2>
      <form className="register__form" name={formName} onSubmit={handleSubmit}>
        <FormInput
          id="register-name"
          label="Имя"
          type="text"
          pattern="^[a-zA-ZА-Яа-яЁё \-]+$"
          minLength={2}
          maxLength={30}
        />
        <FormInput
          id="register-email"
          label="E-mail"
          type="email"
        />
        <FormInput
          id="register-password"
          label="Пароль"
          type="password"
        />
        <button
          className={`register__submit-button ${ !isValid[formName] && "register__submit-button_disabled" }`}
          disabled={!isValid[formName]}
        >
          Зарегистрироваться
        </button>
        <p className="register__alternative-text">
          Уже зарегистрированы?
          <Link
            className="register__link"
            to="/signin"
          >
            Войти
          </Link>
        </p>
      </form>
      <Popup
        isSuccess={isSuccess}
        setPopupOpen={setPopupOpen}
        isPopupOpen={isPopupOpen}
        successMessage="Вы успешно зарегистрировались!"
        errorMessage="Что-то пошло не так! Попробуйте ещё раз."
      />
    </main>
  );
}

export default Register;
