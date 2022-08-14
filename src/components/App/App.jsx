import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
    // //Создаем хуки, управляющие внутренним состоянием.
    // const [currentUser, setCurrentUser] = React.useState({}); // Текущий пользователь
    // const [movies, setMovies] = React.useState([]); // список фильмов, получаемых с сервера
    // const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Для авторизации
    // const [isLoading, setIsLoading] = React.useState(false);
    //
    // const navigate = useNavigate();
    //
    // const [isPopup, setPopup] = React.useState(false); // попап с результатами запросов
    // const [isPopupText, setPopupText] = React.useState(""); // текст для попапа


    return (
        <div className="page">
            <Header/>
            <Switch>

                <Route exact path="/">
                    <Main />
                </Route>
                <Route exact path="/sign-up">
                    <Register />
                </Route>
            </Switch>

            <Footer />
        </div>
    )
}


export default App;
