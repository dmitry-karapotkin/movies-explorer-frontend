import './Profile.css';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MainApi';
import Popup from '../Popup/Popup';

function Profile () {
  const formName = "profile-form";
  const {
    values,
    setValues,
    errors,
    setErrors,
    isValid,
    setIsValid,
    handleChange,
    currentUser,
    setCurrentUser,
    isPopupOpen,
    setPopupOpen,
    isSuccess,
    setSuccess,
  } = useContext(CurrentUserContext);
  const history = useHistory();

  useEffect(() => {
    setValues({
      ...values,
      "profile-name": currentUser.username,
      "profile-email": currentUser.email
    })
  }, []);

  function handleClickEdit (e) {
    e.preventDefault();
    api.updateUserInfo({
      username: values["profile-name"],
      email: values["profile-email"],
    })
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          username: data.name,
          email: data.email,
        });
        setValues({
          ...values,
          "profile-name": data.name,
          "profile-email": data.email,
        });
        setIsValid({
          ...isValid,
          [formName]: false,
        });
        setSuccess(true);
        setPopupOpen(true);
      })
      .catch(err => {
        setSuccess(false);
        console.log(err);
        setErrors({
          ...errors,
          [formName]: err,
        });
        setIsValid({
          ...isValid,
          [formName]: false
        });
        setPopupOpen(true);
      })
  };

  function handleClickSignout (e) {
    e.preventDefault();
    api.logout()
      .then((data) => {
        setCurrentUser({});
        console.log(data.message);
        history.push("/");
      });
  };

  return (
    <main className="profile">
      <h2 className="profile__welcome-text">
        Привет, {currentUser.username}!
      </h2>
      <form className="profile__form" name={formName} >
        <div className="profile__form-grid">
          <label className="profile__label">
            Имя
          </label>
          <input
            id="profile-name"
            value={values["profile-name"]}
            type="text"
            className="profile__input"
            onChange={handleChange}
            required
            pattern="^[a-zA-ZА-Яа-яЁё \-]+$"
            minLength={2}
            maxLength={30}
          />
          <label className="profile__label">
            E-mail
          </label>
          <input
            id="profile-email"
            value={values["profile-email"]}
            type="email"
            className="profile__input"
            onChange={handleChange}
            required
          />
        </div>
        <span className={`profile__error ${
           (errors["profile-email"] || errors["profile-name"]) ? "profile__error_type_active" : ""
        }`}>
        {`${errors["profile-name"] || "" } ${errors["profile-email"] || ""}`}
      </span>
        <button
          className={`profile__link profile__link_action_submit
                     ${ !isValid[formName] ||
                     (values["profile-email"] === currentUser.email &&
                     values["profile-name"] === currentUser.username) ?
                     "profile__link_disabled" : "" }`}
          disabled={
            !isValid[formName] ||
            (values["profile-email"] === currentUser.email &&
            values["profile-name"] === currentUser.username)
          }
          onClick={handleClickEdit}
        >
          Редактировать
        </button>
        <button
          className="profile__link profile__link_action_signout"
          onClick={handleClickSignout}
        >
          Выйти из аккаунта
        </button>
      </form>
      <Popup
        isSuccess={isSuccess}
        setPopupOpen={setPopupOpen}
        isPopupOpen={isPopupOpen}
        successMessage="Данные изменены"
        errorMessage={errors[formName]}
      />
    </main>
  );
}

export default Profile;
