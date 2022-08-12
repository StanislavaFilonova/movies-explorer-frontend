import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation(props) {
    return (
        <div className="navigation">
            <nav className="navigation__block">
                <div className="navigation__buttons">
                    <NavLink
                        className="navigation__button-registration"
                        to={"/sign-up"}>
                        Регистрация
                    </NavLink>
                    <NavLink
                        className="navigation__button-registration navigation__button-login"
                        to={"/sign-in"}>
                        Войти
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;
