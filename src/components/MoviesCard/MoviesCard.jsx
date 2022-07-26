import React from "react";
import './MoviesCard.css';
import movies from '../../images/benksi.svg';

function MoviesCard () {
    return(
        <li className='movie-card'>
            <img
                className='movie-card__img'
                alt='Превью фильма'
                src={movies}
            />
            <div className='movie-card__container'>
                <div className='movie-card__info'>
                    <h2 className='movie-card__name'>В погоне за Бенкси</h2>
                    <p className='movie-card__time'>1ч 47м</p>
                </div>
                <button className='movie-card__like' type='button'></button>
            </div>
        </li>
    )
}

export default MoviesCard;
