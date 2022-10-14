import './Register.css';
import FormInput from '../FormInput/FormInput';
import { Link } from 'react-router-dom';
import mainLogo from '../../images/logo.svg';

function Register() {
  const isError = false;

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
      <form className="register__form" name="register-form">
        <FormInput label="Имя" type="text" isError={isError} />
        <FormInput label="E-mail" type="email" isError={isError} />
        <FormInput label="Пароль" type="password" isError={isError} />
        <button className="register__submit-button">
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
    </main>
  );
}

export default Register;
