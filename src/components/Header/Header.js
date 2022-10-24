import './Header.css';
import Navigation from '../Navigation/Navigation';
import mainLogo from '../../images/logo.svg';
import profileIcon from '../../images/account-icon.svg';
import menuIcon from '../../images/menu-icon.svg';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

function Header({ isMainPage }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  function handleMenuClick() {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <header className={`header ${ isMainPage ? "header_main-page" : ""}`}>
      <Link className="header__logo" to="/">
        <img
          src={mainLogo}
          alt="site-logo"
          />
      </Link>
      <nav className="header-nav">
        <NavLink
          className="header-nav__link"
          activeClassName="header-nav__link_type_active"
          to="/movies"
        >
          Фильмы
        </NavLink>
        <NavLink
          className="header-nav__link"
          activeClassName="header-nav__link_type_active"
          to="/saved-movies"
        >
          Сохранённые фильмы
        </NavLink>
      </nav>
      <Link
        className="header__profile-link"
        to="/profile"
      >
        <p className="header__account">Аккаунт</p>
        <img
          className="header__account-logo"
          src={profileIcon}
          alt="profile-logo"
        />
      </Link>
      <img
        className="header__menu-icon"
        src={menuIcon}
        alt="menu-icon"
        onClick={handleMenuClick}
      />
      <Navigation isOpen={isMenuVisible} closeMenu={setIsMenuVisible}/>
    </header>
  );
}

export default Header;
