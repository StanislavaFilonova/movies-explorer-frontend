import React from 'react';
// import { Route, Switch, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
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
        </div>
    )
}


export default App;
