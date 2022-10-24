import './Login.css';
import FormInput from '../FormInput/FormInput';
import mainLogo from '../../images/logo.svg';

import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MainApi';

function Login() {
  const formName = "login-form";
  const {
    values,
    setValues,
    errors,
    setErrors,
    isValid,
    setIsValid,
    resetForm,
    setCurrentUser,
  } = useContext(CurrentUserContext);
  const history = useHistory();

  function handleSubmit (e) {
    e.preventDefault();
    api.login({
      email: values["login-email"],
      password: values["login-password"],
    })
      .then((_) => {
        api.getUserInfo()
          .then((data) => {
            setCurrentUser({
              id: data._id,
              username: data.name,
              email: data.email,
            });
            resetForm();
            setValues({
              "profile-name": data.name,
              "profile-email": data.email,
            });
            history.push('/movies');
          });
      })
      .catch(err => {
        setErrors({
          ...errors,
          "login-password": err,
        });
        setIsValid({
          ...isValid,
          [formName]: false
        })
      })
  }

  return (
    <main className="login">
      <img
        className="login__logo"
        src={mainLogo}
        alt="site-logo"
      />
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
    </main>
  );
}

export default Login;
