import './FilterCheckbox.css';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function FilterCheckbox({ toggleId }) {
  const { toggleState, setToggleState } = useContext(CurrentUserContext);

  function handleToggleChange (e) {
    setToggleState(
      {
        ...toggleState,
        [toggleId]: e.target.checked
      }
    );
  }

  return (
    <div className="toggle">
      <label className="toggle__button">
        <input
          id={toggleId}
          type="checkbox"
          className="toggle__box"
          onChange={handleToggleChange}
          defaultChecked={toggleState[toggleId]}
        />
        <span className="toggle__slider"></span>
      </label>
      <span className="toggle__label">
        Короткометражки
      </span>
    </div>
  );
}

export default FilterCheckbox;
