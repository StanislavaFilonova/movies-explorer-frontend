import React from "react";
import './SavedMovieCard.css';
import movies from '../../images/benksi.svg';

function SavedMovieCard () {
    return(
        <li className='saved-movie-card'>
            <img
                className='saved-movie-card__img'
                alt='Превью фильма'
                src={movies}
            />
            <div className='saved-movie-card__container'>
                <div className='saved-movie-card__info'>
                    <h2 className='saved-movie-card__name'>В погоне за Бенкси</h2>
                    <p className='saved-movie-card__time'>1ч 47м</p>
                </div>
                <button className='saved-movie-card__delete' type='button'></button>
            </div>
        </li>
    )
}

export default SavedMovieCard;
