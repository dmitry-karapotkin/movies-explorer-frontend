import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="aboutProject">
      <h2 className="main-page__title">
        О проекте
      </h2>
      <div className="about-project__info">
        <div className="about-project__info-block">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__paragraph">
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__info-block">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="timeline">
        <p className="timeline__week timeline__week_color_green">1 неделя</p>
        <p className="timeline__week timeline__week_color_gray">4 недели</p>
        <p className="timeline__caption">Back-end</p>
        <p className="timeline__caption">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
