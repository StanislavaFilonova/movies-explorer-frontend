import '../Login/Login.css';
import React from "react";
import { useFormWithValidation } from "../../utils/Validation";

function Login(props) {

    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

    // Хук для очистки формы
    React.useEffect(() => {
        resetForm({});
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        const { email, password } = values;
        props.onLogin(email, password);
    }

    return(
        <div className='login'>
            <h2 className='login__title'>Рады видеть!</h2>
            <form className='login__form' onSubmit={handleSubmit}>
                <div className='login__field'>
                    <label className='login__field-hint'>
                        E-mail
                    </label>
                    <input
                        className='login__field-input'
                        type='email'
                        required
                        name='email'
                        id='login-email'
                        autoComplete='off'
                        minLength='2'
                        maxLength='15'
                        pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
                        value={values.email || ""}
                        onChange={handleChange}
                    />
                    <span className='login__field-input-err'>{errors.email}</span>
                </div>
                <div className='login__field'>
                    <label className='login__field-hint'>
                        Пароль
                    </label>
                    <input
                        className='login__field-input'
                        type='password'
                        required
                        name='password'
                        id='login-password'
                        autoComplete='off'
                        minLength='6'
                        maxLength='20'
                        value={values.password || ""}
                        onChange={handleChange}
                    />
                    <span className='login__field-input-err'>{errors.password}</span>
                    <span className="login__field-input-err">{props.message}</span>
                </div>
                <button
                    type="submit"
                    className={`login__button ${!isValid && "login__button_disabled"}`}> Войти
                </button>
            </form>
            <p className="login__redirect">Ещё не зарегистрированы?&nbsp;
                <a className="login__link" href="/sign-up">Регистрация</a>
            </p>
        </div>
    )
}

export default Login;
