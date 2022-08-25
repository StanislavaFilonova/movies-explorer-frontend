import React from 'react';

import './AboutMe.css';
import '../Main/Main.css'
import myPhoto from '../../images/myPhoto.jpg'

function AboutMe() {
    return (
        <section className="about-me section">
            <h2 className="section__title">Студент</h2>
            <div className="about-me__block">
                <div className="about-me__block-info">
                    <h3 className="about-me__name">Станислава</h3>
                    <p className="about-me__occupation">Фронтенд-разработчик, 31 год</p>
                    <div className="about-me__text">
                        По образованию я учитель английского языка и менеджер по управлению проектами. В университете начала интресоваться сферой IT. Люблю путешествовать, заниматься спортом и смотреть фильмы.
                    </div>
                    <nav className="about-me__contacts">
                        <a
                            href="https://github.com/StanislavaFilonova"
                            target="_blank"
                            className="about-me__link active__link"
                            rel="noreferrer">
                            <p className="about-me__link">GitHub</p>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/stanislava-filonova-15735b226"
                            target="_blank"
                            className="about-me__link active__link"
                            rel="noreferrer">
                            <p className="about-me__link">Linkidin</p>
                        </a>
                    </nav>
                </div>
                <img
                    className="about-me__photo"
                    src={myPhoto}
                    alt="фото студента"
                />
            </div>
        </section>
    )
}

export default AboutMe;
