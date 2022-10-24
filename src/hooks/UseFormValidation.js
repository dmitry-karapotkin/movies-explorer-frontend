import { useState, useCallback } from 'react';


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
    setErrors({...errors, [id]: e.target.validationMessage});
    setIsValid(
      {
        ...isValid,
        [e.target.closest('form').name]: e.target.closest('form').checkValidity()
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
