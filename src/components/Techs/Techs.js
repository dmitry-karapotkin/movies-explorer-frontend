import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <h2 className="main-page__title">
        Технологии
      </h2>
      <h3 className="techs__subtitle">
        7 технологий
      </h3>
      <p className="techs__paragraph">
      На курсе веб-разработки мы освоили
      технологии, которые применили в дипломном проекте.
      </p>
      <ul className="techs-list">
        <li className="techs-list__item">HTML</li>
        <li className="techs-list__item">CSS</li>
        <li className="techs-list__item">JS</li>
        <li className="techs-list__item">React</li>
        <li className="techs-list__item">Git</li>
        <li className="techs-list__item">Express.js</li>
        <li className="techs-list__item">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
