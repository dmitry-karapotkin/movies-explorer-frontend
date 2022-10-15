import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">
        Портфолио
      </h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://dmitry-karapotkin.github.io/russian-travel"
            target="_blank"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://dmitry-karapotkin.github.io/mesto"
            target="_blank"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://dmitry-karapotkin.github.io/react-mesto-auth"
            target="_blank"
          >
            Адаптивное приложение
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
