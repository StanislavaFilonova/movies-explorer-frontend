// import React from "react";
// Импортируем изображение, чтобы оно отображалось на страничке
import logotype from "../../images/logotype.svg";

import { useLocation, Link } from "react-router-dom";
import './Header.css';
import '../Navigation/Navigation';
import Navigation from "../Navigation/Navigation";

function Header() {
    let location = useLocation();

    return(
        <header className={` header ${location.pathname === "/" ? "header_grey" : ""} ${(location.pathname === "/sign-in" || location.pathname === "/sign-up") ? "header_welcome" : ""} }
        }`}>
            <Link to='/' className='header__logo-click'>
            <img
                className="header__logo"
                src={logotype}
                alt="Логотип"
            />
            </Link>
            {!(location.pathname === "/sign-in" || location.pathname === "/sign-up" || location.pathname === "/profile" || location.pathname === "/movies" || location.pathname === "/saved-movies") &&  <Navigation/>}
        </header>
    )

}
// Экспорт компонента, чтобы потом можно было с ним работать
export default Header;
