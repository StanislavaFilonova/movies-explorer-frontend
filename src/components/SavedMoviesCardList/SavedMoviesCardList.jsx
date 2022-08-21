import React from "react";
import '../SavedMoviesCardList/SavedMoviesCardList.css';
import SavedMovieCard from "../SavedMovieCard/SavedMovieCard";

function SavedMoviesCardList ({savedCards}) {
    return(
        <section className='saved-movies-list'>
            <ul className='saved-movies-list__cards'>
                {savedCards.map((card) => (
                    <SavedMovieCard
                        key={card.movieId}
                        card={card}
                        name={card.nameRU}
                        duration={card.duration}
                        {...card}
                    />
                ))}
            </ul>
        </section>
    )
}

export default SavedMoviesCardList;
