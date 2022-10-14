import './Promo.css';
import planetImage from '../../images/planet.svg';
import NavTab from '../NavTab/NavTab';

function Promo() {
  return (
    <section className="promo">
      <NavTab />
      <div className="promo__content">
        <img
          className="promo__planet-image"
          src={planetImage}
          alt="planet-image"
        />
        <div className="promo__description">
          <h2 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h2>
          <p className="promo__details">
            Листайте ниже, чтобы узнать больше про этот проект
            и его создателя.
          </p>
        </div>
      </div>
      <button className="promo__next-button">
          Узнай больше
      </button>
    </section>
  );
}

export default Promo;
