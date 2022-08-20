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
// import ProtectedRoute from "../ProtectedRoute";

import './App.css';

import auth from "../../utils/Auth";
import api from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";


function App(movie) {

    // Создаем хуки, управляющие внутренним состоянием.
    const [cards, setCards] = React.useState([]);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [saveMoviesCard, setSaveMoviesCard] = React.useState([]);

    const history = useHistory();

    //---------------------------------------------------------------------------------------------------------------------

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
                    if (saveFilmIds.includes(item.id))
                        item.isLiked = true;
                    else
                        item.isLiked = false;
                });

                setSaveMoviesCard(savedCards); // локально храним все сохраненные ранее карточки
                setCards(cards); // рисуем все пришедшие карточки с сайта фильмов
            })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => console.log("200"));
        }
    }, [isLoggedIn]);

//---------------------------------------------------------------------------------------------------------------------
    React.useEffect(() => {
        mainApi.getSavedMovies().then((movies) => {
            setSaveMoviesCard(movies);
        }).catch((err) => {
            console.log("Не удалось получить список фильмов."
            );
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
                    history.push("/movies");
                }
            })
            .catch(() => {
                console.log("Переданный токен некорректен.");
                setIsLoggedIn(false);
            });
    }

    // Проверяем зарегистрирован ли пользователь
    function handleIsRegister(userName, userEmail, userPassword,  resetForm) {
        auth.register(userName, userEmail, userPassword)
            .then((res) => {
                console.log("200 - всё корректно заполнено");
                // setIsInfoToolTipPopup({ status: true, open: true });
                // setIsInfoToolTipPopupOpen(true);
                // setIsSuccess(true);
                history.push("/sign-in");
                resetForm();
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.log("400 - некорректно заполнено одно из полей");
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
        if(!isLiked){
            mainApi
                .putMovieLike(movie, !isLiked)
                .then((res) => {
                    const newSavedMovies = [res, ...saveMoviesCard];
                    setSaveMoviesCard(newSavedMovies);
                    res.isLiked = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function handleIsLogin(userEmail, userPassword, resetForm) {
        auth.login(userEmail, userPassword)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    resetForm();
                    setIsLoggedIn(true);
                    // setEmail(email);
                    history.push("/");
                }
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.log("400 - не передано одно из полей");
                    // setIsSuccess(false);
                    // setIsInfoToolTipPopupOpen(true);
                } else if (err.status === 401) {
                    console.log("401 - пользователь с email не найден");
                    // setIsInfoToolTipPopupOpen(true);
                }
                // setIsInfoToolTipPopup({ status: false, open: true });
            });
    }

    return (
        <div className="page">
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
                    />
                </Route>
                <Route exact path="/sign-in">
                    <Login
                        onLogin={handleIsLogin}
                        history={history}
                    />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/movies">
                    <Movies
                    isLoggedIn={isLoggedIn}
                    cards={cards}
                    onCardLike={handleMovieLike}
                    />
                </Route>
                <Route exact path="/saved-movies">
                    <SavedMovies />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>

            <Footer />
        </div>
    )
}

export default App;
