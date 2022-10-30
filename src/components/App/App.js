import './App.css';
import { useEffect, useState, useReducer } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from '../../hooks/UseFormValidation';
import { api as mainApi } from '../../utils/MainApi';
import { api as moviesApi } from '../../utils/MoviesApi';
import {
  screenReducer,
  initScreenReducer,
  moviesReducer,
  initMoviesReducer
} from '../../utils/reducer';


function App() {
  const [device, setDevice] = useReducer(screenReducer, window.innerWidth, initScreenReducer);
  const [movies, setMovies] = useReducer(moviesReducer, null, initMoviesReducer);

  const [currentUser, setCurrentUser] = useState({});
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const history = useHistory();
  const location = useLocation();
  const initialPath = history.location.pathname;

  useEffect(() => {
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
        history.push(initialPath);
        setLoading(false);
      });
    moviesApi.getMovies()
    .then((data) => {
      setMovies({
        type: "update",
        key: "moviesList",
        value: data
      })
    })
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {

    function wrapTimeout(callee, timeout) {
      let timer;
      return function perform(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          callee(...args);
        }, timeout);
      }
    }


    const changeScreen = () => {
      const width = window.innerWidth;
      setDevice(width);
      console.log(width);
    }

    const timeoutChangeScreen = wrapTimeout(changeScreen, 2000);

    window.addEventListener('resize', timeoutChangeScreen);

    return () => window.removeEventListener('resize', timeoutChangeScreen);
  }, []);

  const {
    values,
    setValues,
    errors,
    setErrors,
    isValid,
    setIsValid,
    handleChange,
    resetForm
  } = useFormValidation();


  return (
    <CurrentUserContext.Provider value={{
      device,
      movies,
      setMovies,
      currentUser,
      setCurrentUser,
      isLoading,
      setLoading,
      values,
      setValues,
      errors,
      setErrors,
      isValid,
      setIsValid,
      handleChange,
      resetForm,
      isPopupOpen,
      setPopupOpen,
      isSuccess,
      setSuccess,
    }}>
      <div className="page">
        <Preloader pageInitializing={true} />

        <Switch>

          <Route exact path="/">
            { currentUser.username ? <Header isMainPage={true}/> : "" }
            <Main />
            <Footer />
          </Route>

          <ProtectedRoute exact path="/movies">
            <Header isMainPage={false}/>
            <Movies />
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute exact path="/saved-movies">
            <Header isMainPage={false}/>
            <SavedMovies />
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile">
            <Header isMainPage={false}/>
            <Profile />
          </ProtectedRoute>

          <Route exact path="/signup">
          { currentUser.username ? <Redirect to="/"/> : <Register /> }
          </Route>

          <Route exact path="/signin">
          { currentUser.username ? <Redirect to="/"/> : <Login /> }
          </Route>

          <Route path="*" component={NotFound} />

        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
