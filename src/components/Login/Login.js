import './Login.css';
import FormInput from '../FormInput/FormInput';
import Popup from '../Popup/Popup';
import Logo from '../Logo/Logo';

import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api as mainApi } from '../../utils/MainApi';

function Login() {
  const formName = "login-form";
  const history = useHistory();
  const {
    values,
    errors,
    setErrors,
    isValid,
    setIsValid,
    isSuccess,
    setPopupOpen,
    setSuccess,
    isPopupOpen,
    setCurrentUser,
    setLoading,
  } = useContext(CurrentUserContext);

  function handleSubmit (e) {
    e.preventDefault();
    mainApi.login({
      email: values["login-email"],
      password: values["login-password"],
    })
      .then((data) => {
        mainApi.getUserInfo()
          .then((data) => {
            if (data !== undefined) {
              setCurrentUser({
                id: data._id,
                username: data.name,
                email: data.email,
              });
            }
          })
          .catch(err => console.log(err))
          .finally(() => {
            history.push('/movies');
            setLoading(false);
          });
      })
      .catch(err => {
        setErrors({
          ...errors,
          "register-password": err,
        });
        setIsValid({
          ...isValid,
          [formName]: false
        });
        setSuccess(false);
        setPopupOpen(true);
      })
}

  return (
    <main className="login">
      <Logo />
      <h2 className="login__welcome-text">
        Рады видеть!
      </h2>
      <form className="login__form" name={formName} onSubmit={handleSubmit}>
        <FormInput
          id="login-email"
          label="E-mail"
          type="email"
        />
        <FormInput
          id="login-password"
          label="Пароль"
          type="password"
        />
          <button
            className={`login__submit-button ${ !isValid[formName] && "login__submit-button_disabled" }`}
            disabled={!isValid[formName]}
          >
            Войти
          </button>
          <p className="login__alternative-text">
            Ещё не зарегистрированы?
            <Link
              className="login__link"
              to="/signup"
            >
              Регистрация
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

export default Login;
