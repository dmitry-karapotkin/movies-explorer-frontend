import './Profile.css';
import { Link } from 'react-router-dom';

function Profile () {
  return (
    <main className="profile">
      <h2 className="profile__welcome-text">
        Привет, Виталий!
      </h2>
      <form className="profile__form" name="profile">
        <div className="profile__form-grid">
          <label className="profile__label">
            Имя
          </label>
          <input type="email" className="profile__input"/>
          <label className="profile__label">
            E-mail
          </label>
          <input type="email" className="profile__input"/>
        </div>
        <button
          className="profile__link profile__link_action_submit"
        >
          Редактировать
        </button>
        <Link
          className="profile__link profile__link_action_signout"
          to="/"
        >
          Выйти из аккаунта
        </Link>
      </form>
    </main>
  );
}

export default Profile;
