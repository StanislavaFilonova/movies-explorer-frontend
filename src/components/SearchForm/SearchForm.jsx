import './SearchForm.css';
import { useLocation, Route } from 'react-router-dom';

import React from "react";
import Slider from "./Slider/Slider";

function SearchForm({ onSearchMovies }) {
    const [request, setRequest] = React.useState(localStorage.getItem('request') ?? ''); // Запрос на локальное хранилище
    const [requestSaved, setRequestSaved] = React.useState(''); //Сохранение запроса
    const [checkboxStatus, setCheckboxStatus] = React.useState(
        JSON.parse(localStorage.getItem('checkboxStatus')) ?? false
    );
    const [checkboxStatusSaved, setCheckboxStatusSaved] = React.useState(false); //Статус/сообщение

    let location = useLocation();

    React.useEffect(() => {
        const value = localStorage.getItem('checkboxStatus');
        if (location.pathname === '/movies') {
            if (localStorage.getItem('request')) {
                setRequest(localStorage.getItem('request'));
            }
            if (JSON.parse(value) === true) {
                setCheckboxStatus(true);
            } else {
                setCheckboxStatus(false);
            }
        }
        if (location.pathname === '/saved-movies') {
            if (requestSaved) {
                setRequestSaved(requestSaved);
            }
            if (checkboxStatusSaved === true) {
                setCheckboxStatusSaved(true);
            } else {
                setCheckboxStatusSaved(false);
            }
        } // eslint-disable-next-line
    }, [location.pathname]);

    // Функция , помогающая избежать перезагрузки страницы
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchMovies(request, checkboxStatus);
    };

    const handleSubmitSavedMovie = (e) => {
        e.preventDefault();
        onSearchMovies(requestSaved, checkboxStatusSaved);
    };

    function handleChangeRequest(e) {
        setRequest(e.target.value);
    }

    function handleChangeRequestSaved(e) {
        setRequestSaved(e.target.value);
    }

    const handleChange = (checkboxStatus) => {
        setCheckboxStatus(checkboxStatus);
        onSearchMovies(request, checkboxStatus);
    };

    const handleChangeSaved = (checkboxStatusSaved) => {
        setCheckboxStatusSaved(checkboxStatusSaved);
        onSearchMovies(requestSaved, checkboxStatusSaved);
    };

    const handleCheckboxChange = (e) => {
        handleChange(e.target.checked);
    };

    const handleCheckboxChangeSaved = (e) => {
        handleChangeSaved(e.target.checked);
    };

    return (
        <section className='search__section'>
            <div className='search'>
                <Route path='/movies'>
                <form className='search__form' noValidate='' onSubmit={handleSubmit}>
                    <input className='search__input'
                           placeholder='Фильм'
                           type='text'
                           value={request || ''}
                           onChange={handleChangeRequest}
                           required
                    />
                    <button className='search__button false' type='submit'>Поиск</button>
                    <span className='search__error'/>
                </form>
                    <div className='search__tumbler-box'>
                        <Slider
                            onChange={handleCheckboxChange}
                            shotMovies={checkboxStatus}
                        />
                        <p className='search__text'>Короткометражки</p>
                    </div>
                </Route>

                <Route path='/saved-movies'>
                    <form className='search__form' onSubmit={handleSubmitSavedMovie}>
                        <input
                            className='search__input'
                            type='text'
                            placeholder='Фильм'
                            value={requestSaved || ''}
                            onChange={handleChangeRequestSaved}
                            required
                        />
                        <button
                            className='search__button'
                            type='submit'
                        >Поиск</button>
                        <span className='search__error'/>
                    </form>
                        <div className='search__tumbler-box'>
                            <Slider
                                onChange={handleCheckboxChangeSaved}
                                shotMovies={checkboxStatusSaved}
                            />
                            <span className='search__text'>Короткометражки</span>
                        </div>
                </Route>
            </div>
        </section>
    );
}

export default SearchForm;
