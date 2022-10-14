import './AboutMe.css';
import studentPhoto from '../../images/student-photo.png';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="main-page__title">
        Студент
      </h2>
      <div className="about-me__details">
        <img className="about-me__photo" src={studentPhoto} alt="student-photo" />
        <div className="bio">
          <h3 className="bio__title">
            Виталий
          </h3>
          <p className="bio__subtitle">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="bio__paragraph">
            Я родился и живу в Саратове, закончил
            факультет экономики СГУ. У меня есть
            жена и дочь. Я люблю слушать музыку,
            а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с
            постоянной работы.
          </p>
          <a className="bio__link" href="https://github.com/dmitry-karapotkin/" target="_blank">Github</a>
        </div>
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
