import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="toggle">
      <label className="toggle__button">
        <input type="checkbox" className="toggle__box" />
        <span className="toggle__slider"></span>
      </label>
      <span className="toggle__label">
        Короткометражки
      </span>
    </div>
  );
}

export default FilterCheckbox;
