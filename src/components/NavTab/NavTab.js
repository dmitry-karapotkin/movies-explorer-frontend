import './NavTab.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function NavTab() {
  return (
    <nav className="nav-tab">
      <Logo />
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
