import './FormInput.css';

function FormInput ({ label, type, isError }) {
  return (
    <div className="form-input">
      <label className="form-input__label">
        {label}
      </label>
      <input type={type} className="form-input__input" required />
      <span className={`form-input__error ${ isError ? "form-input__error_type_active" : "" }`}>
        Что-то пошло не так...
      </span>
    </div>
  );
}

export default FormInput;
