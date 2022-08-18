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

function App() {

    const history = useHistory();

    // Проверяем зарегистрирован ли пользователь
    function handleIsRegister(userName, userEmail, userPassword, resetForm) {
        auth.register(userName, userEmail, userPassword)
            .then((res) => {
                console.log("200 - всё корректно заполнено");
                // setIsInfoToolTipPopup({ status: true, open: true });
                // setIsInfoToolTipPopupOpen(true);
                // setIsSuccess(true);
                history.push("/signin");
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
    return (
        <div className="page">
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route exact path="/sign-up">
                    <Register
                        onRegister={handleIsRegister}
                        history={history}
                    />
                </Route>
                <Route exact path="/sign-in">
                    <Login />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/movies">
                    <Movies />
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
