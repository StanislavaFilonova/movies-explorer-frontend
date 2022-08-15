import '../Register/Register.css';

function Login() {
    return(
        <div className='register'>
            <h2 className='register__title'>Рады видеть!</h2>
            <form className='register__form'>

                <div className='register__field'>
                    <label className='register__field-hint'>
                        E-mail
                    </label>
                    <input
                        className='register__field-input'
                        type='email'
                        required
                        name='email'
                        autoComplete='on'
                        minLength='2'
                        maxLength='15'
                    />
                    <span className='register__field-input-err' />
                </div>

                <div className='register__field'>
                    <label className='register__field-hint'>
                        Пароль
                    </label>
                    <input
                        className='register__field-input'
                        type='password'
                        required
                        name='password'
                        autoComplete='on'
                        minLength='6'
                        maxLength='20'
                    />
                    <span className='register__field-input-err'/>
                </div>

            </form>
            <button
                type="submit"
                className="register__button"> Войти
            </button>
            <p className="register__redirect">Ещё не зарегистрированы?&nbsp;
                <a className="register__link" href="/sign-up">Регистрация</a>
            </p>
        </div>
    )

}

export default Login;
