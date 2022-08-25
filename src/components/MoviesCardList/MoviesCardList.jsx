import React from "react";
import './MoviesCardList.css';
import './../Movies/Movies.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList ({ onCardLike, cards, movies, onCardDelete, setInitialSavedMovies }) {
    return(
        <section className='movies-list'>
            <ul className='movies-list__cards'>
                {cards.map((card) => (
                    <MoviesCard
                        key={card.id || card.movieId}
                        card={card}
                        cards={cards}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        setInitialSavedMovies={setInitialSavedMovies}
                        movies={movies}
                    />
                ))}
            </ul>
        </section>
    )
}

export default MoviesCardList;
