import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__paragraph">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__info">
        <p className="footer__copyright">
          &#169; 2020
        </p>
        <ul className="footer__links-list">
          <li className="footer__list-item">
            <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__list-item">
            <a className="footer__link" href="https://www.github.com/" target="_blank">
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
