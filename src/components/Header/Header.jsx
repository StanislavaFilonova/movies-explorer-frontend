// Импортируем изображение, чтобы оно отображалось на страничке
import logotype from "../../images/logotype.svg";

import { useLocation, Link } from "react-router-dom";
import './Header.css';
import '../Navigation/Navigation';
import Navigation from "../Navigation/Navigation";
import MobileNavigation from "../MobileNavigation/MobileNavigation"
import HeaderLinks from "./HeaderLinks/HeaderLinks";

function Header({ isLoggedIn }) {
    let location = useLocation();

    return (
        <>
            {!isLoggedIn ? (<header
                className={` header ${location.pathname === "/" ? "header_grey" : ""} ${(location.pathname === "/sign-in" || location.pathname === "/sign-up") ? "header_welcome" : ""} ${(location.pathname === "/movies" || location.pathname === "/saved-films") ? "header_menu" : ""} ${location.pathname === "/profile" ? "header__profile" : ""}`}>
                <Link to='/' className='header__logo-click'>
                    <img
                        className="header__logo"
                        src={logotype}
                        alt="Логотип"
                    />
                </Link>
                {!(location.pathname === "/sign-in" || location.pathname === "/sign-up" || location.pathname === "/profile" || location.pathname === "/movies" || location.pathname === "/saved-movies") &&
                <Navigation/>}
            </header>) : (
                <header
                    className={` header ${location.pathname === "/" ? "header_grey" : ""} ${(location.pathname === "/sign-in" || location.pathname === "/sign-up") ? "header_welcome" : ""} ${(location.pathname === "/movies" || location.pathname === "/saved-films") ? "header_menu" : ""} ${location.pathname === "/profile" ? "header__profile" : ""}`}>
                    <Link to='/' className='header__logo-click'>
                        <img
                            className="header__logo"
                            src={logotype}
                            alt="Логотип"
                        />
                    </Link>
                    {(location.pathname === "/profile" || location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === "/") &&
                    <MobileNavigation/>}
                    {(location.pathname === "/profile" || location.pathname === "/movies" || location.pathname === "/saved-movies" || location.pathname === "/") &&
                    <HeaderLinks/>}
                </header>)
            }
        </>
    )
}
// Экспорт компонента, чтобы потом можно было с ним работать
export default Header;
