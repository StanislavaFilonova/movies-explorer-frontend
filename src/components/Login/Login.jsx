import '../Login/Login.css';
import React from "react";

function Login(props) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleEmailChange(ev) {
        setEmail(ev.target.value);
    }

    function handlePasswordChange(ev) {
        setPassword(ev.target.value);
    }

    // очистка данных формы
    function resetForm() {
        setEmail("");
        setPassword("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        props.onLogin(email, password, resetForm);
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
                        autoComplete='on'
                        minLength='2'
                        maxLength='15'
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <span className='login__field-input-err' />
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
                        autoComplete='on'
                        minLength='6'
                        maxLength='20'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <span className='login__field-input-err'/>
                </div>
                <button
                    type="submit"
                    className="login__button"> Войти
                </button>
            </form>
            <p className="login__redirect">Ещё не зарегистрированы?&nbsp;
                <a className="login__link" href="/sign-up">Регистрация</a>
            </p>
        </div>
    )
}

export default Login;
