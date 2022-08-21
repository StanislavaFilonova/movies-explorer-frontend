import React from "react";

export function useForm() {
    const [values, setValues] = React.useState({});

    const handleChange = (evt) => {
        const input = evt.target;
        const { value } = input;
        const { name } = input;
        setValues({ ...values, [name]: value });
    };

    return { values, handleChange, setValues };
}

// хук управления формой и валидации формы
export function useFormWithValidation() {
    // Используем один хук, чтобы не расписывать: эмейл, имя, пароль
    const [values, setValues] = React.useState({});
    // Хук для установки сообщения об ошибке
    const [errors, setErrors] = React.useState({});
    // Хук для валидирования вводнвх данных
    const [isValid, setIsValid] = React.useState(false);

    // Одна функция вместо трех написанных ранее
    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        // используем оператор spread, чтобы иметь возможность обращаться ко всем внутренним составляющим
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = React.useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, handleChange, errors, isValid, resetForm };
}

