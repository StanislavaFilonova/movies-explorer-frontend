import '../Header.css';
import { Link } from "react-router-dom";
import React from "react";

function HeaderLinks() {
    return(
        <>
            <div className='header__container'>
                <Link className='header__link header__link_navigation' to='/movies'>Фильмы</Link>
                <Link className='header__link header__link_navigation' to='/saved-movies'>Сохраненные фильмы</Link>
            </div>

            <Link to="/profile" className='header-navigation__profile-button'>
                                       <span className="header-navigation__profile-button-icon">
                                           <span className="header-navigation__profile-button-icon-img"> </span>
                                       </span>
                <span className="header-navigation__profile-button-text"> Аккаунт </span>
            </Link>
        </>
    )
}

export default HeaderLinks;
