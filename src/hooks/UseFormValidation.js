import { useState, useCallback } from 'react';
import { REGEX_EMAIL } from '../utils/constants';


export function useFormValidation () {
  const formListDefault = {
    "register-form": false,
    "login-form": false,
    "profile-form": false,
  }
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(formListDefault);

  const handleChange = (e) => {
    const {id, value} = e.target;
    setValues({...values, [id]: value});
    let error;
    let isFormValid;
    if (id.includes("email")) {
      const regexEmailError = REGEX_EMAIL.test(value);
      error = regexEmailError ? "": "Неверный формат почты";
      isFormValid = e.target.closest('form').checkValidity() && regexEmailError;
    } else {
      error = e.target.validationMessage;
      isFormValid = e.target.closest('form').checkValidity();
    }
    setErrors({...errors, [id]: error});
    setIsValid(
      {
        ...isValid,
        [e.target.closest('form').name]: isFormValid
      }
    );
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = formListDefault) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return {values, setValues, errors, setErrors, isValid, setIsValid, handleChange, resetForm};
}
