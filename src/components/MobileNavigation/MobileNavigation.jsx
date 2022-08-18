import React from "react";
import { NavLink } from "react-router-dom";
import "./MobileNavigation.css";

import closeBurgerMenu from "./../../images/close.svg";

export default function MobileNavigation() {
    const [open, setOpen] = React.useState(false);
    const closeMobileMenu = () => setOpen(false);

    return (
            <>
                {open ? (
                    <button
                        className="menu-burger__close-btn"
                        onClick={() => closeMobileMenu()}
                    >
                        <img
                            className="menu-burger__close-btn-img"
                            src={closeBurgerMenu}
                            alt=""
                        />
                    </button>
                ) : (
                    <button
                        className="menu-burger"
                        onClick={() => {
                            setOpen(!open);
                        }}
                    >
                        <span className="menu-burger__bar"></span>
                        <span className="menu-burger__bar"></span>
                        <span className="menu-burger__bar"></span>
                    </button>
                )}

                {open && (
                    <>
                        <ul className="mobile-navigation">
                            <div className="mobile-navigation__wrapper">
                                <ul className="mobile-navigation__menu">
                                    <li>
                                        <NavLink
                                            exact
                                            to="/"
                                            className="mobile-navigation__link"
                                            activeClassName="mobile-navigation__link mobile-navigation__link_type_active"
                                            onClick={() => closeMobileMenu()}
                                        >
                                            Главная
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/movies"
                                            className="mobile-navigation__link"
                                            activeClassName="mobile-navigation__link mobile-navigation__link_type_active"
                                            onClick={() => closeMobileMenu()}
                                        >
                                            Фильмы
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/saved-movies"
                                            className="mobile-navigation__link"
                                            activeClassName="mobile-navigation__link mobile-navigation__link_type_active"
                                            onClick={() => closeMobileMenu()}
                                        >
                                            Сохранённые фильмы
                                        </NavLink>
                                    </li>
                                </ul>
                                <li>
                                    <NavLink to="/profile" className='mobile-navigation__profile-button' onClick={() => closeMobileMenu()}>
                                       <span className="mobile-navigation__profile-button-icon">
                                           <span className="mobile-navigation__profile-button-icon-img"> </span>
                                       </span>
                                        <span className="mobile-navigation__profile-button-text"> Аккаунт </span>
                                    </NavLink>
                                </li>
                            </div>
                        </ul>
                        <div className="cover"></div>
                    </>
                )}
            </>
    );
}
