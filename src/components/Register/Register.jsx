import './Register.css';

function Register() {
    return(
        <div className='register'>
            <h2 className='register__title'>Добро пожаловать!</h2>
            <form className='register__form'>
                <div className='register__field'>
                    <label className='register__field-hint'>
                    Имя
                    </label>
                    <input
                        className='register__field-input'
                        type='text'
                        required
                        name='name'
                        autoComplete='on'
                        minLength='2'
                        maxLength='30'
                        id='register-name'
                    />
                    <span className='register__field-input-err' />
                </div>

                <div className='register__field'>
                    <label className='register__field-hint'>
                        E-mail
                    </label>
                    <input
                        className='register__field-input'
                        type='email'
                        id='register-email'
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
                        id='register-password'
                        required
                        name='password'
                        autoComplete='on'
                        minLength='6'
                        maxLength='20'
                    />
                    <span className='register__field-input-err'>
                        Что-то пошло не так...
                    </span>
                </div>

            </form>
            <button
                type="submit"
                className="register__button"> Зарегистрироваться
            </button>
            <p className="register__redirect">Уже зарегистрированы?&nbsp;
                <a className="register__link" href="/sign-in">Войти</a>
            </p>
        </div>
    )
}

export default Register;
