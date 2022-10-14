import './Login.css';
import FormInput from '../FormInput/FormInput';
import { Link } from 'react-router-dom';
import mainLogo from '../../images/logo.svg';

function Login() {
  const isError = true;

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
      <form className="login__form" name="login-form">
        <FormInput label="E-mail" type="email" isError={isError} />
        <FormInput label="Пароль" type="password" isError={isError} />
          <button className="login__submit-button">
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
