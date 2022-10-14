import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">
        Портфолио
      </h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          Статичный сайт
        </li>
        <li className="portfolio__item">
          Адаптивный сайт
        </li>
        <li className="portfolio__item">
          Адаптивное приложение
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
