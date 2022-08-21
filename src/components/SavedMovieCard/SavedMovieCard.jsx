import React from "react";
import './SavedMovieCard.css';
// import movies from '../../images/benksi.svg';

function SavedMovieCard (card) {
    return(
        <li className='saved-movie-card'>
            <img
                className='saved-movie-card__img'
                alt={`Кадр из фильма ${card.nameRU}`}
                src={`${card.image}`}
            />
            <div className='saved-movie-card__container'>
                <div className='saved-movie-card__info'>
                    <h2 className='saved-movie-card__name'>{card.nameRU}</h2>
                    <p className='saved-movie-card__time'>{`${card.duration} мин`}</p>
                </div>
                <button className='saved-movie-card__delete' type='button'></button>
            </div>
        </li>
    )
}

export default SavedMovieCard;
