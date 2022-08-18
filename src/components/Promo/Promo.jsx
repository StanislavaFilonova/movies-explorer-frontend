import React from 'react';
import './Promo.css';
import landing from '../../images/landing-logo.svg';

function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <img
                className="promo__image"
                src={landing}
                alt="фоновая картика"
            />
            </div>
        </section>
    );
}

export default Promo;
