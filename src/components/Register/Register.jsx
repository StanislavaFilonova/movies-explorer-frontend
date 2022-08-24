import React from "react";
import './Register.css';
import { useFormWithValidation } from "../../utils/Validation";

function Register(props) {
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

    // Хук для очистки формы
    React.useEffect(() => {
        resetForm({});
    }, []);

    // Функция, которая проверяет введены ли эмейл и пароль, закидывает введенные занчения в свои ячейки
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        const { name, password, email } = values;
        props.onRegister({ name, password, email });
    };

    return(
        <div className='register'>
            <h2 className='register__title'>Добро пожаловать!</h2>
            <form className='register__form' name="form-register" onSubmit={handleSubmit}>
                <div className='register__field'>
                    <label className='register__field-hint'>
                        Имя
                    </label>
                    <input
                        id='name'
                        name='name'
                        className='register__field-input'
                        type='text'
                        required
                        placeholder=""
                        pattern='[a-zA-Zа-яА-Я -]{1,}'
                        autoComplete='off'
                        minLength='2'
                        maxLength='30'
                        value={values.name || ""}
                        onChange={handleChange}
                    />
                    <span className='register__field-input-err'> {errors.name} </span>
                </div>
                <div className='register__field'>
                    <label className='register__field-hint'>
                        E-mail
                    </label>
                    <input
                        className='register__field-input'
                        type='email'
                        id='email'
                        required
                        name='email'
                        autoComplete='off'
                        minLength='2'
                        pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
                        value={values.email || ""}
                        onChange={handleChange}
                    />
                    <span className='register__field-input-err'> {errors.email} </span>
                </div>
                <div className='register__field'>
                    <label className='register__field-hint'>
                        Пароль
                    </label>
                    <input
                        className='register__field-input'
                        type='password'
                        id='password'
                        required
                        name='password'
                        autoComplete='off'
                        minLength='6'
                        maxLength='20'
                        value={values.password || ""}
                        onChange={handleChange}
                    />
                    <span className='register__field-input-err'>
                        {errors.password}
                    </span>
                    <span className="register__field-input-err">{props.message}</span>
                </div>

                <button
                    type="submit"
                    className={`register__button
                        ${!isValid && "register__button_disabled "}`}
                    > Зарегистрироваться
                </button>
            </form>
            <p className="register__redirect">Уже зарегистрированы?&nbsp;
                <a className="register__link" href="/sign-in">Войти</a>
            </p>
        </div>
    );
}

export default Register;
