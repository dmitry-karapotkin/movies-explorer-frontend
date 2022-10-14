import './App.css';
import { Route, Switch } from 'react-router-dom';
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

function App() {
  const loggedIn = true;
  return (
    <div className="page">

      <Switch>

        <Route exact path="/">
          <Main />
          <Footer />
        </Route>

        <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
          <Header />
          <Movies />
          <Footer />
        </ProtectedRoute>

        <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
          <Header />
          <SavedMovies />
          <Footer />
        </ProtectedRoute>

        <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
          <Header />
          <Profile />
        </ProtectedRoute>

        <Route exact path="/signup">
          <Register />
        </Route>

        <Route exact path="/signin">
          <Login />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
