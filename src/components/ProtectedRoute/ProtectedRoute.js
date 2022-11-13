import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Route>
      { currentUser.username ? children: <Redirect to="/" />}
    </Route>
  );
}

export default ProtectedRoute;
