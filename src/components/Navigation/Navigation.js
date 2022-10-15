import './Navigation.css';
import closeIcon from '../../images/cross-icon.svg';
import profileIcon from '../../images/account-icon.svg';
import { NavLink, Link } from 'react-router-dom';

function Navigation({ isOpen, closeMenu }) {
  function handleCloseIconClick () {
    closeMenu(!isOpen);
  }

  return (
    <nav className={`slide-menu ${isOpen ? "slide-menu_state_open" : ""}`}>
      <img
        className="slide-menu__close-icon"
        src={closeIcon}
        alt="close-icon"
        onClick={handleCloseIconClick}
      />
      <Link
        className="slide-menu__link"
        to="/movies"
      >
        Главная
      </Link>
      <NavLink
        className="slide-menu__link"
        activeClassName="slide-menu__link_type_active"
        to="/movies"
      >
        Фильмы
      </NavLink>
      <NavLink
        className="slide-menu__link"
        activeClassName="slide-menu__link_type_active"
        to="/saved-movies"
      >
        Сохранённые фильмы
      </NavLink>
      <Link
        className="slide-menu__profile-link"
        to="/profile"
      >
        <p className="slide-menu__account">Аккаунт</p>
        <img
          className="slide-menu__account-logo"
          src={profileIcon}
          alt="profile-logo"
        />
      </Link>
    </nav>
  );
}

export default Navigation;
