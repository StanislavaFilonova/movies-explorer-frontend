import React from "react";
import './MoviesCard.css';
import { Switch, Route } from 'react-router-dom';
const MOVIES_SERVER_URL  = "https://api.nomoreparties.co";

function MoviesCard ({ card, onCardLike, onCardDelete, movies }) {
    const isLiked = movies.some((e) => e.movieId == card.id)
    // Функция отрисовки лайка
    const handleMoviesLiked = () => {
        if (isLiked) {
            const currentMovie = movies.find(item => item.movieId == card.id)
            onCardDelete(currentMovie)
        } else if (!isLiked) {
            onCardLike({
                country: card.country,
                director: card.director,
                duration: card.duration,
                year: card.year,
                description: card.description,
                image: `${MOVIES_SERVER_URL}${card.image.url}`,
                trailerLink: card.trailerLink,
                thumbnail: `${MOVIES_SERVER_URL}${card.image.url}`,
                movieId: `${card.id}`,
                nameRU: card.nameRU,
                nameEN: card.nameEN,
            });
        }
    };

    function getMovieDuration(min) {
        return `${Math.floor(min / 60)}ч ${min % 60}м`;
    }

    const handleMovieDelete = () => {
        onCardDelete(card);
    };
    //---------------------------------------------------------------------------------------------------------------------
    return(
        <li className='movie-card'>
            <Switch>
                <Route path='/movies'>
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
                </Route>
                <Route path='/saved-movies'>
                    <a className="movie-card__trailer"
                        href={card.trailerLink || card.trailer} target={"_blank"} rel="noopener noreferrer">
                        <img src={card.image} alt={card.nameRU} className='movie-card__img' />
                    </a>
                </Route>
            </Switch>
            <div className='movie-card__container'>
                <div className='movie-card__info'>
                    <p className='movie-card__name'>{card.nameRU}</p>
                    <Switch>
                        <Route path='/movies'>
                            <button
                                className={!isLiked ? `movie-card__like` : `movie-card__like_active`}
                                onClick={handleMoviesLiked}
                                type='button'
                            >
                            </button>
                        </Route>
                        <Route path='/saved-movies'>
                            <button
                                className='movie-card__delete'
                                onClick={handleMovieDelete}
                                type='button'
                            >
                            </button>
                        </Route>
                    </Switch>
                </div>
                <p className='movie-card__time'>{getMovieDuration(card.duration)}</p>
            </div>
        </li>
    )
}

export default MoviesCard;
