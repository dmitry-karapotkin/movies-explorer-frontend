import './NotFound.css';

function NotFound() {
  return (
    <main className="not-found">
      <h2 className="not-found__title">
        404
      </h2>
      <h3 className="not-found__subtitle">
        Страница не найдена
      </h3>
      <a className="not-found__back-link" href="/">Назад</a>
    </main>
  );
}

export default NotFound;
