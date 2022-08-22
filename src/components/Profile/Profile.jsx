import React from "react";
import { Link } from 'react-router-dom';
import CurrentUserContext from "./../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/Validation";
import './Profile.css';

function Profile(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

    // Хук на очистку формы, если зашел пользователь
    React.useEffect(() => {
        if (currentUser) {
            resetForm(currentUser, {}, true);
        }
        }, [currentUser, resetForm]);

    const handleChangeData = (e) => {
        e.preventDefault();
        const {name, email} = values;
        props.onProfileChange(name, email);
    }

    const handleSignOut = (e) => {
        e.preventDefault();
        props.onSignOut();
    }

    return (
            <div className="profile section">
                <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
                    <form
                        className='profile__form' onSubmit={handleChangeData}
                    >
                        <div className='profile__input-box'>
                                <p className='profile__input-name'>Имя</p>
                                <input
                                    className='profile__field-name'
                                    type='text'
                                    required
                                    name='name'
                                    autoComplete='off'
                                    minLength='2'
                                    maxLength='15'
                                    id='name'
                                    value={values.name || currentUser.name}
                                    placeholder="Имя"
                                    onChange={handleChange}
                                    pattern="^[А-Яа-яЁёA-Za-z]+-? ?[А-Яа-яЁёA-Za-z]+$"
                                />
                        </div>
                        <span className="profile__input-error" id="name-error">
                            {errors.name}
                        </span>
                        <div className='profile__input-box'>
                            <p className='profile__input-email'>E-mail</p>
                            <input
                                className='profile__field-email'
                                type='email'
                                id='email'
                                required
                                name='email'
                                autoComplete='off'
                                pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
                                minLength='2'
                                value={values.email || currentUser.email}
                                placeholder='email'
                                onChange={handleChange}
                            />
                        </div>
                        <span className="profile__input-error" id="email-error">
                            {errors.email}
                        </span>
                        <div className='profile__links'>

                            <button
                                type='submit'
                                className={`profile__link
                                ${!isValid && "profile__link_disabled"}
                                ${
                                    values.email === currentUser.email &&
                                    values.name === currentUser.name &&
                                    "profile__link_disabled"
                                }`}
                            >Редактировать</button>
                            <Link to='/'>
                                <button onClick={handleSignOut} type='button' className='profile__link  profile__link_exit'>Выйти из аккаунта</button>
                            </Link>
                        </div>
                    </form>

            </div>
    )
}

export default Profile;
