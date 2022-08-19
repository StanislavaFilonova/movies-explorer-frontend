import './Register.css';
import React from "react";

function Register(props) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleNameChange(ev) {
        setName(ev.target.value);
    }

    function handleEmailChange(ev) {
        setEmail(ev.target.value);
    }

    function handlePasswordChange(ev) {
        setPassword(ev.target.value);
    }

    // очистка данных формы
    function resetForm() {
        setName("");
        setEmail("");
        setPassword("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !email || !password) {
            return;
        }
        props.onRegister(name, email, password, resetForm);
    }

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
                        value={name}
                        onChange={handleNameChange}
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
                        id='email'
                        required
                        name='email'
                        autoComplete='off'
                        minLength='2'
                        maxLength='15'
                        pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
                        value={email}
                        onChange={handleEmailChange}
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
                        id='password'
                        required
                        name='password'
                        autoComplete='off'
                        minLength='6'
                        maxLength='20'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <span className='register__field-input-err'>
                        Что-то пошло не так...
                    </span>
                </div>
                <button
                    type="submit"
                    className="register__button"
                    disabled={!(name || email || password)}> Зарегистрироваться
                </button>
            </form>
            <p className="register__redirect">Уже зарегистрированы?&nbsp;
                <a className="register__link" href="/sign-in">Войти</a>
            </p>
        </div>
    );
}

export default Register;
