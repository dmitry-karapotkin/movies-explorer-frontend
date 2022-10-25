import './App.css';
import { useEffect, useState, useReducer } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
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
import { api } from '../../utils/MainApi';


function App() {
  const initialWidth = window.innerWidth;
  const initialQueryText = {
    "search-text-saved-movies": "",
    "search-text-movies": ""
  };
  const initialToggleState = {
    "search-text-saved-movies": false,
    "search-text-movies": false
  }

  function reducer(_, newWidth) {
    if (newWidth > 768) {
      return { screen: 'desktop', addCards: 4, initGrid: 12 };
    } else if (newWidth > 480) {
      return { screen: 'tablet', addCards: 2, initGrid: 8 };
    } else {
      return { screen: 'mobile', addCards: 2, initGrid: 5 };
    }
  };

  function initReducer(initWidth) {
    return reducer("", initWidth);
  };

  const [currentUser, setCurrentUser] = useState({});
  const [queryText, setQueryText] = useState(initialQueryText);
  const [moviesList, setMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [toggleState, setToggleState] = useState(initialToggleState);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [device, setDevice] = useReducer(reducer, initialWidth, initReducer);

  const history = useHistory();
  const initialPath = history.location.pathname;

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        if (data !== undefined) {
          setCurrentUser({
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
  }, []);

  useEffect(() => {
    api.getMovies()
      .then((data) => {
        setSavedMoviesList(data);
      })
  }, []);

  useEffect(() => {

    function throttle(callee, timeout) {
      let timer = null;
      return function perform(...args) {
        if (timer) return;
        timer = setTimeout(() => {
          callee(...args);
          clearTimeout(timer);
          timer = null;
        }, timeout)
      }
    }

    const changeScreen = () => {
      const width = window.innerWidth;
      setDevice(width);
    }

    const throttledChangeScreen = throttle(changeScreen, 500);

    window.addEventListener('resize', throttledChangeScreen);

    return () => window.removeEventListener('resize', throttledChangeScreen);
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
      currentUser,
      setCurrentUser,
      isLoading,
      setLoading,
      queryText,
      setQueryText,
      moviesList,
      setMoviesList,
      savedMoviesList,
      setSavedMoviesList,
      toggleState,
      setToggleState,
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

          <Route path="*">
            <NotFound />
          </Route>

        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
