import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="not-found">
      <h2 className="not-found__title">
        404
      </h2>
      <h3 className="not-found__subtitle">
        Страница не найдена
      </h3>
      <Link className="not-found__back-link" to="/">Назад</Link>
    </main>
  );
}

export default NotFound;
