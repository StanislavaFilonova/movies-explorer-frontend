import React from 'react';
import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
    return(
        <section className="portfolio section">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__table">
                <li className="portfolio__item">
                    <p className="portfolio__link">Статичный сайт</p>
                    <a
                        className="link-click"
                        href="https://github.com/StanislavaFilonova/how-to-learn"
                        target="_blank"
                        rel = "noreferrer noopener"
                    >
                        <img className="portfolio__arrow" alt="иконка перехода на проект" src={arrow}></img>
                    </a>
                </li>
                <li className="portfolio__item">
                    <p className="portfolio__link">Адаптивный сайт</p>
                    <a
                        className="link-click "
                        href="https://stanislavafilonova.github.io/russian-travel/"
                        target="_blank"
                        rel = "noreferrer noopener"
                    >
                        <img className="portfolio__arrow" alt="иконка перехода на проект" src={arrow}></img>
                    </a>
                </li>
                <li className="portfolio__item">
                    <p className="portfolio__link">Одностраничное приложение</p>
                    <a
                        className="link-click "
                        href="https://github.com/StanislavaFilonova/react-mesto-api-full"
                        target="_blank"
                        rel = "noreferrer noopener"
                    >
                        <img className="portfolio__arrow" alt="иконка перехода на проект" src={arrow}></img>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;
