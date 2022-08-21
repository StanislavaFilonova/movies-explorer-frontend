import React from "react";
import './MoviesCard.css';
// import movies from '../../images/benksi.svg';
const MOVIES_SERVER_URL  = "https://api.nomoreparties.co";

function MoviesCard ({ card, onCardLike }) {

    function handleLike() {
        onCardLike(card);
    }
    //---------------------------------------------------------------------------------------------------------------------
    return(
        <li className='movie-card'>
            <a className="movie-card__trailer"
               href={card.trailerLink || card.trailer}
               target="_blank"
               rel="noopener noreferrer"
            >
            <img
                className='movie-card__img'
                alt={`Кадр из фильма ${card.nameRU}`}
                src={`${MOVIES_SERVER_URL}${card.image.url}`}
            />
            </a>
            <div className='movie-card__container'>
                <div className='movie-card__info'>
                    <h2 className='movie-card__name'>{card.nameRU}</h2>
                    <button className={`${card.cardLikeCssClass}`} type='button' onClick={handleLike}></button>
                </div>
                <p className='movie-card__time'>{`${card.duration} мин`}</p>
            </div>
        </li>
    )
}

export default MoviesCard;
