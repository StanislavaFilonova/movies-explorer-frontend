import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
// ---------------------------------------------------------------------------------------
import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from "../Profile/Profile";
import Footer from '../Footer/Footer';
import ProtectedRoute from "../ProtectedRoute";
import CurrentUserContext  from "../../contexts/CurrentUserContext"

import './App.css';

import auth from "../../utils/Auth";
import api from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

//---------------------------------------------------------------------------------------------------------------------
// Сообщения об ошибках
import {
    CONFLICT_EMAIL,
    AUTH_ERROR,
    SERVER_ERROR,
    MOVIES_SERVER_ERROR,
    INVALID_DATA,
} from "./../../utils/responses";

function App(movie) {
    // Создаем хуки, управляющие внутренним состоянием.
    const [cards, setCards] = React.useState([]);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [saveMoviesCard, setSaveMoviesCard] = React.useState([]);
    // Хук прочитает информацию о пользователе, под которым вошли на сайт и положит в переменную currentUser.Сработает при загрузке страницы
    const [currentUser, setCurrentUser] = React.useState({});
    const [message, setMessage] = React.useState(null);

    const history = useHistory();

    // const resetMessage = () => {
    //     setMessage(null);
    // };
    //---------------------------------------------------------------------------------------------------------------------
    // Функция, которая показывает сообщения об ошибках/успешные ответы
    function showResponseMessage(message) {
        setMessage(message);
        setTimeout(() => setMessage(""), 10000);
    }

    // Хук для начитки инфо об авторизованном пользователе
    React.useEffect(() => {
        if (isLoggedIn) {
            mainApi.getUserInfo().then((userInfo) => {
                setCurrentUser(userInfo);
            }).catch((err) => {
                console.log("Не удалось получить информацию о пользователе.");
                console.log(err);
            });
        }
    }, [isLoggedIn]);

    // Настраиваем хук, который устанавливает колбэки. Функция будет вызвана после того, как будут внесены все изменения в DOM.
    React.useEffect(() => {
        // setIsLoading(true);
        // Чтение данных с сервера (информация о пользователе и карточках)
        // Проверим, авторизован ли пользователь
        if (isLoggedIn) {
            Promise.all([
                api.getMoviesCards(), // 1й вызов, идет на сервер за данными внешними
                mainApi.getSavedMovies() //2й параллельный вызов, идет на свой сервер за сохраненными фильмами
            ]).then(([cards, savedCards]) => {
                // обойдем все карточки: наши сохраненные и с сервера и найдем полайканные (сохраненные у нас)
                const saveFilmIds = [];
                savedCards.forEach((item, i, arr) => {
                    saveFilmIds.push(item.movieId)
                });
                cards.forEach((item, i, arr) => {
                    if (saveFilmIds.includes(item.id)) {
                        item.cardLikeCssClass = 'movie-card__like_active';
                        item.isLiked = true;
                    }
                    else {
                        item.isLiked = false;
                        item.cardLikeCssClass = 'movie-card__like';
                    }
                });
                setSaveMoviesCard(savedCards); // локально храним все сохраненные ранее карточки
                setCards(cards); // рисуем все пришедшие карточки с сайта фильмов
            })
                .catch((err) => {
                    if (err === "500") {
                        setMessage(MOVIES_SERVER_ERROR);
                    }
                    console.log(err);
                })
                .finally(() => console.log("200"));
        }
    }, [isLoggedIn]);

//---------------------------------------------------------------------------------------------------------------------
    // Получение сохраненных карточек
    React.useEffect(() => {
        mainApi.getSavedMovies().then((movies) => {
            setSaveMoviesCard(movies);
        }).catch((err) => {
            if (err === "500") {
                setMessage(MOVIES_SERVER_ERROR);
            }
            console.log(err);
        })
        }, []);

    //---------------------------------------------------------------------------------------------------------------------
    // Хук для проверки токена при каждом монтировании компонента App
    React.useEffect(
        () => {
            handleIsToken();
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

//---------------------------------------------------------------------------------------------------------------------
    // Получение токена
    function handleIsToken() {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
            return
        }
        auth
            .checkToken(jwt)
            .then((res) => {
                if(res) {
                    setIsLoggedIn(true);
                    // history.push("/movies");
                }
            })
            .catch(() => {
                console.log("Переданный токен некорректен.");
                setIsLoggedIn(false);
            });
    }

    // Проверяем зарегистрирован ли пользователь
    function handleIsRegister(data) {
        auth.register(data)
            .then((res) => {
                console.log("200 - всё корректно заполнено");
                // setIsInfoToolTipPopup({ status: true, open: true });
                // setIsInfoToolTipPopupOpen(true);
                // setIsSuccess(true);
                history.push("/movies");
            })
            .catch((err) => {
                if (err.status === 400) {
                    return showResponseMessage(INVALID_DATA);
                }
                if (err.status === 409) {
                    return showResponseMessage(CONFLICT_EMAIL);
                } else if (err.status === 500) {
                    return showResponseMessage(SERVER_ERROR);
                }
                // setIsInfoToolTipPopup({ status: false, open: true });
                // setIsInfoToolTipPopupOpen(true);
                // setIsSuccess(false);
            });
    }

    // проверка состояния лайка
    function checkLikeSaveMovie(movie) {
        return saveMoviesCard.some((i) => i === movie.id);
    }

    // Функция постановки лайка фильму и его дальнейщее сохранение
    function handleMovieLike (movie) {
        const isLiked = checkLikeSaveMovie(movie);
        let cardLikeCssClass;
        if(!isLiked){
            mainApi
                .putMovieLike(movie, !isLiked, cardLikeCssClass)
                .then((res) => {
                    const newSavedMovies = [res, ...saveMoviesCard];
                    setSaveMoviesCard(newSavedMovies);
                    res.isLiked = true;
                    res.cardLikeCssClass = 'movie-card__like';
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        movie.cardLikeCssClass ='movie-card__like_active';
    }
    // Функция логирования пользователя
    function handleIsLogin(userEmail, userPassword) {
        auth.login(userEmail, userPassword)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    setIsLoggedIn(true);
                    history.push("/movies");
                }
            })
            .catch((err) => {
                if (err.status === 400) {
                    return showResponseMessage(INVALID_DATA);
                    // setIsSuccess(false);
                } else if (err.status === 401) {
                    return showResponseMessage(AUTH_ERROR);
                    // setIsInfoToolTipPopupOpen(true);
                } else if (err.status === 500) {
                    return showResponseMessage(SERVER_ERROR);
                }
            });
    }
    // Функция редактирования пользователя
    function handleProfileChange(name, email) {
        mainApi.editProfile({ name: name, email: email ? email : currentUser.email}).then((updatedUser) => {
            console.log('Профиль пользователя успешно обновлен!');
            setCurrentUser(updatedUser);
        }).catch((err) => {
            console.warn('Не удалось обновить профиль пользователя, возникла ошибка:');
            console.warn(err);
        });
    }

    const handleSignOut = () => {
        setIsLoggedIn(false);
        localStorage.clear()
        history.push('/');
    };

    // -----------------------------------------------------------------------------------------------------------------
    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
            <Header/>
            <Switch>
                <Route
                    exact path="/"
                >
                    <Main/>
                </Route>
                <Route exact path="/sign-up">
                    <Register
                        onRegister={handleIsRegister}
                        history={history}
                        message={message}
                    />
                </Route>
                <Route exact path="/sign-in">
                    <Login
                        onLogin={handleIsLogin}
                        history={history}
                        message={message}
                    />
                </Route>
                <ProtectedRoute
                    exact path="/profile"
                    component={Profile}
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    message={message}
                    onProfileChange={handleProfileChange}
                    onSignOut={handleSignOut}
                    />
                <ProtectedRoute
                    exact path="/movies"
                    component={Movies}
                    isLoggedIn={isLoggedIn}
                    cards={cards}
                    savedCards={saveMoviesCard}
                    onCardLike={handleMovieLike}
                    message={message}
                    />
                <ProtectedRoute
                    exact path="/saved-movies"
                    component={SavedMovies}
                    isLoggedIn={isLoggedIn}
                    savedCards={saveMoviesCard}
                    message={message}
                    />
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
            <Footer />
            </CurrentUserContext.Provider>
        </div>
    )
}

export default App;
