import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import CurrentUserContext  from "../../contexts/CurrentUserContext"
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

import './App.css';

import auth from "../../utils/Auth";
import mainApi from "../../utils/MainApi";

// Сообщения об ошибках
import {
    CONFLICT_EMAIL,
    AUTH_ERROR,
    SERVER_ERROR,
    MOVIES_SERVER_ERROR,
    INVALID_DATA,
    SUCCESS_EDIT,
    PROFILE_EDIT_ERROR
} from "../../utils/responses";

function App() {
    // Создаем хуки, управляющие внутренним состоянием.
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    // Хук прочитает информацию о пользователе, под которым вошли на сайт и положит в переменную currentUser.Сработает при загрузке страницы
    const [currentUser, setCurrentUser] = React.useState({});

    const [saveMoviesCard, setSaveMoviesCard] = React.useState([]);
    const [isRegisterSending, setRegisterSending] = React.useState(true);
    const [isLoginSending, setLoginSending] = React.useState(true);
    const [isProfileSending, setProfileSending] = React.useState(false);

    const [message, setMessage] = React.useState(null);
    const history = useHistory();
    const { pathname } = useLocation();

    //------------------------------------------------------------------------------------------------------------------

    // Хук для начитки инфо об авторизованном пользователе
    React.useEffect(() => {
        if (isLoggedIn) {
            mainApi.getUserInfo()
                .then((userInfo) => {
                    setCurrentUser(userInfo);
            }).catch((err) => {
                console.log("Не удалось получить информацию о пользователе с сервера.");
                console.log(err);
            });
        }
    }, [isLoggedIn]);

    // Получение сохраненных карточек
    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            mainApi
                .getMovies(jwt)
                .then((data) => {
                    setSaveMoviesCard(data.filter((i) => i.owner === currentUser._id));
                })
                .catch((err) => {
                    if (err === "500") {
                        setMessage(MOVIES_SERVER_ERROR);
                    }
                    console.log(err);
                });
        }
    }, [currentUser]);

    // Хук для проверки токена при каждом монтировании компонента App
    React.useEffect(
        () => {
            handleIsToken();
        },
        []
    );

//---------------------------------------------------------------------------------------------------------------------

    // Функция, которая показывает сообщения об ошибках/успешные ответы
    function showResponseMessage(message) {
        setMessage(message);
        setTimeout(() => setMessage(""), 10000);
    }

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
                    history.push(pathname)
                }
            })
            .catch(() => {
                console.log("Переданный токен некорректен.");
                setIsLoggedIn(false);
            });
    }

    // Проверяем зарегистрирован ли пользователь
    function handleIsRegister(data) {
        setRegisterSending(false);
        auth.register(data)
            .then((res) => {
                console.log("200 - всё корректно заполнено");
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
            }).finally(() => {
                setRegisterSending(true);
        });
    }

    // Функция логирования пользователя
    function handleIsLogin(userEmail, userPassword) {
        setLoginSending(false);
        auth.login(userEmail, userPassword)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    setIsLoggedIn(true);
                    history.push("/movies");
                }
            })
            .catch((err) => {
                if (err.status === 400) {
                    return showResponseMessage(INVALID_DATA);
                } else if (err.status === 401) {
                    return showResponseMessage(AUTH_ERROR);
                } else if (err.status === 500) {
                    return showResponseMessage(SERVER_ERROR);
                }
            })
            .finally(() => {
                setLoginSending(true);
            });
    }

    // Функция постановки лайка фильму и его дальнейщее сохранение
    function handleMovieLike (movie) {
        mainApi
            .putMovieLike(movie)
                .then((newMovie) => {
                    setSaveMoviesCard((movies) => [newMovie, ...movies]);
                    newMovie.isLiked = true;
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    // Удаление фильма
    const handleDeleteMovie = (card) => {
        mainApi.deleteMovies(card)
            .then(() => {
                setSaveMoviesCard((movies) => movies.filter((i) => i._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Функция редактирования пользователя
    function handleProfileChange(name, email) {
        setProfileSending(true);
        mainApi.editProfile({ name: name, email: email ? email : currentUser.email}).then((updatedUser) => {
            showResponseMessage(SUCCESS_EDIT);
            setCurrentUser(updatedUser);
        }).catch((err) => {
            if (err.status === 409) {
                return showResponseMessage(CONFLICT_EMAIL);
            }
            if (err.status === 500) {
                return showResponseMessage(SERVER_ERROR);
            } else if (err.status === 400) {
                return showResponseMessage(PROFILE_EDIT_ERROR);
            }
            console.log(err);
        })
            .finally(() => {
                setProfileSending(false);
            });
    }

    // Функция выхода
    const handleSignOut = () => {
        setIsLoggedIn(false);
        localStorage.clear()
        history.push('/');
    };

    // -----------------------------------------------------------------------------------------------------------------

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header isLoggedIn={isLoggedIn}/>
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
                        isSending={isProfileSending}
                    />
                    <ProtectedRoute
                        exact path="/movies"
                        component={Movies}
                        isLoggedIn={isLoggedIn}
                        cards={saveMoviesCard}
                        onCardLike={handleMovieLike}
                        message={message}
                        onCardDelete={handleDeleteMovie}
                    />
                    <ProtectedRoute
                        exact path="/saved-movies"
                        component={SavedMovies}
                        isLoggedIn={isLoggedIn}
                        cards={saveMoviesCard}
                        message={message}
                        onCardDelete={handleDeleteMovie}
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


