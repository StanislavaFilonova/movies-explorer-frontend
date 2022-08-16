import '../Login/Login.css';

function Login() {
    return(
        <div className='login'>
            <h2 className='login__title'>Рады видеть!</h2>
            <form className='login__form'>

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
                    />
                    <span className='login__field-input-err'/>
                </div>
            </form>
            <button
                type="submit"
                className="login__button"> Войти
            </button>
            <p className="login__redirect">Ещё не зарегистрированы?&nbsp;
                <a className="login__link" href="/sign-up">Регистрация</a>
            </p>
        </div>
    )
}

export default Login;
