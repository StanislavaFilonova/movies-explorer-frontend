import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import './App.css';
import Profile from "../Profile/Profile";
import auth from "../../utils/Auth";

import api from "../../utils/MoviesApi";

function App() {

    // Создаем хуки, управляющие внутренним состоянием.
    const [cards, setCards] = React.useState([]);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const history = useHistory();

    //---------------------------------------------------------------------------------------------------------------------

    // Настраиваем хук, который устанавливает колбэки. Функция будет вызвана после того, как будут внесены все изменения в DOM.
    React.useEffect(() => {
        // setIsLoading(true);
        // Чтение данных с сервера (информация о пользователе и карточках)
        // Проверим, авторизован ли пользователь
        if (isLoggedIn) {
            Promise.all([api.getMoviesCards()])
                .then(([cards]) => {
                    setCards(cards);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => console.log("200"));
        }
    }, [isLoggedIn]);

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

    function handleIsLogin(userEmail, userPassword, resetForm) {
        auth.login(userEmail, userPassword)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    resetForm();
                    // setIsLoggedIn(true);
                    // setEmail(email);
                    history.push("/home");
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
                    <Main />
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
                <Route
                    exact path="/movies">
                    isLoggedIn={isLoggedIn}
                    cards={cards}
                    component={Movies}
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
