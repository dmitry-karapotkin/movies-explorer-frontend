import './FormInput.css';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function FormInput ({ id, label, type, pattern, minLength, maxLength }) {
  const { values, errors, handleChange } = useContext(CurrentUserContext);

  return (
    <div className="form-input">
      <label className="form-input__label">
        {label}
      </label>
      <input
        id={id}
        pattern={pattern}
        type={type}
        className="form-input__input"
        value={values[id] || ""}
        onChange={handleChange}
        required
        minLength={minLength}
        maxLength={maxLength}
      />
      <span className={`form-input__error ${ errors[id] ? "form-input__error_type_active" : "" }`}>
        {errors[id]}
      </span>
    </div>
  );
}

export default FormInput;
