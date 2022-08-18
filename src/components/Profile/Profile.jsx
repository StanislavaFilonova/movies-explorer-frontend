import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {

    const handleChangeData = (e) => {
        e.preventDefault()
    }

    return (
            <div className="profile section">
                <h2 className='profile__title'>Привет, Станислава!</h2>
                    <form
                        className='profile__form'
                    >
                        <div className='profile__input-box'>
                                <p className='profile__input-name'>Имя</p>
                                <input
                                    className='profile__field-name'
                                    type='text'
                                    required
                                    name='name'
                                    autoComplete='on'
                                    minLength='2'
                                    maxLength='15'
                                    id='name'
                                    value='Станислава'
                                    placeholder="Имя"
                                />
                        </div>
                        <div className='profile__input-box'>
                            <p className='profile__input-email'>E-mail</p>
                            <input
                                className='profile__field-email'
                                type='email'
                                id='email'
                                required
                                name='email'
                                autoComplete='on'
                                minLength='2'
                                value='stanislava@yandex.ru'
                                placeholder='email'
                            />
                        </div>
                    </form>
                        <div className='profile__links'>
                            <button
                                onClick={handleChangeData}
                                type='button'
                                     className='profile__link profile__link-edit'>Редактировать</button>
                            <Link to='/' type='button' className='profile__link  profile__link_exit'>Выйти из аккаунта</Link>
                        </div>
            </div>
    )
}

export default Profile;
