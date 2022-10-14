import './NavTab.css';
import mainLogo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function NavTab() {
  return (
    <nav className="nav-tab">
      <Link className="nav-tab__logo" to="/">
        <img
          src={mainLogo}
          alt="site-logo"
          />
      </Link>
      <Link
        className="nav-tab__reg-link"
        to="/signup"
      >
        Регистрация
      </Link>
      <Link
        to="/signin"
      >
        <button className="nav-tab__login-button">
          Войти
        </button>
      </Link>
    </nav>
  );
}

export default NavTab;
