import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {
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
