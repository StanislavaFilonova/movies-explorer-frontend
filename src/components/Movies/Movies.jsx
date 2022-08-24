import React from "react";

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";

import filmsFilter from './filmsFilter';
import './Movies.css';
import moviesApi from "../../utils/MoviesApi";

// Сообщения об ошибках
import {
    MOVIES_NOT_FOUND, MOVIES_SERVER_ERROR,
} from "../../utils/responses";


function Movies({ cards, onCardClick, onCardLike, onCardDelete }) {
    const [request, setRequest] = React.useState(''); // Запрос
    const [checkboxStatus, setCheckboxStatus] = React.useState(
        JSON.parse(localStorage.getItem('checkboxStatus')) ?? false
    ); // Проверка статуса чекбокса

    const [initialMovies, setInitialMovies] = React.useState([]); // первоначальный список фильмов
    const [moviesToRender, setMoviesToRender] = React.useState([]); // Список фильмов для возврата после поиска
    const [filteredMovies, setFilteredMovies] = React.useState([]); // отфильтрованные фильмы

    const [isSearchMovies, setSearchMovies] = React.useState(false); // поиск фильмов
    const [searchStatus, setSearchStatus] = React.useState(''); // статус после поиска фильма

    const [firstResultsNumber, setFirstResultsNumber] = React.useState(0); // первоначальный результат отображения фильмов
    const [moreResultsNumber, setMoreResultsNumber] = React.useState(0); // больше отображение фильмов
    const [isElseButtonVisible, setIsElseButtonVisible] = React.useState(false); // показывается или нет кнопка ЕЩЁ
    const [isLoading, setLoading] = React.useState(false); //Статус загрузки

    const currentViewport = document.documentElement.clientWidth; // Прислушиваемся к размеру экрана пользователя

    // Хук для поиска фильмов
    React.useEffect(() => {
        if (localStorage.getItem('searchResults')) {
            const init = JSON.parse(localStorage.getItem('searchResults'));
            const searchResult = filmsFilter(init, request, checkboxStatus);
            setFilteredMovies(searchResult);
        }
    }, []);
    //Функция поиска и получения фильмов с сервера moviesApi
    const handleSearch = (request, checkboxStatus) => {
        setMoviesToRender([]);
        setRequest(request);
        setCheckboxStatus(checkboxStatus);
        setLoading(true);
        const initialMoviesInLocalStorage = JSON.parse(
            localStorage.getItem('initialMovies')
        );
        if (!initialMoviesInLocalStorage) {
            setSearchMovies(true);
            moviesApi
                .getMoviesCards()
                .then((data) => {
                    setInitialMovies(data);
                    localStorage.setItem('initialMovies', JSON.stringify(data));
                })
                .catch(() => {
                    setSearchStatus(MOVIES_SERVER_ERROR);
                })
                .finally(() => {
                    setSearchMovies(false);
                    setLoading(false);
                });
        } else {
            setInitialMovies(initialMoviesInLocalStorage);
            setSearchStatus(MOVIES_NOT_FOUND);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (initialMovies.length > 0) {
            const searchResults = filmsFilter(initialMovies, request, checkboxStatus);
            setFilteredMovies(searchResults);
            localStorage.setItem('request', request);
            localStorage.setItem('checkboxStatus', checkboxStatus);
            localStorage.setItem('searchResults', JSON.stringify(searchResults));
        }
    }, [initialMovies, request, checkboxStatus]);
    // Размещение фильмов
    React.useEffect(() => {
        if (filteredMovies.length > 0) {
            if (filteredMovies.length > firstResultsNumber) {
                setMoviesToRender(filteredMovies.slice(0, firstResultsNumber));
                setIsElseButtonVisible(true);
            } else {
                setMoviesToRender(filteredMovies);
            }
        }
    }, [filteredMovies, firstResultsNumber]);

    //Работа кнопки "ЕЩЁ"
    function handleMoreButtonClick() {
        setLoading(true);
        setMoviesToRender((state) =>
            filteredMovies.slice(0, state.length + moreResultsNumber)
        );
        setLoading(false);
    }

    React.useEffect(() => {
        if (moviesToRender.length === filteredMovies.length) {
            setIsElseButtonVisible(false);
        }
    }, [moviesToRender, filteredMovies]);

    function handleMoviesCount() {
        if (currentViewport <= 480) {
            setFirstResultsNumber(5);
            setMoreResultsNumber(1);
        } else if (currentViewport <= 768) {
            setFirstResultsNumber(8);
            setMoreResultsNumber(2);
        } else if (currentViewport <= 1279) {
            setFirstResultsNumber(12);
            setMoreResultsNumber(3);
        } else if (currentViewport >= 1280) {
            setFirstResultsNumber(12);
            setMoreResultsNumber(4);
        }
    }

    React.useEffect(() => {
        handleMoviesCount();
    }, []);

    React.useEffect(() => {
        const handleResizeWindow = () => {
            setTimeout(handleMoviesCount, 3000);
        }
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        }
    }, []);

    //------------------------------------------------------------------------------------------------------------------

    return (
        <section className="movies">
            <SearchForm onSearchMovies={handleSearch}/>
            {isLoading ? (
                    <Preloader />
                ) : (
                    <>
            {moviesToRender.length > 0 ? (
                <MoviesCardList
                    onCardLike={onCardLike}
                    movies={cards}
                    cards={moviesToRender}
                    onMoreBtn={handleMoreButtonClick}
                    onCardClick={onCardClick}
                    onCardDelete={onCardDelete}
                />
            ) : (
                <span className='movies__status'>{searchStatus || MOVIES_NOT_FOUND}</span>
            )}
                : (
                <button
                    className= {
                        isElseButtonVisible
                            ? 'movies__more-button'
                            : 'movies__more-button_hidden'
                        }
                    type='button'
                    onClick={handleMoreButtonClick}
                >
                    Ещё
                </button>
            </>
            )}
        </section>
    )
}

export default Movies;
