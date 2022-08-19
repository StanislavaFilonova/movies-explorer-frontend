import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import React from "react";
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";

function Movies({ onCardLike, cards }) {
    return (
            <section className="movies">
                <SearchForm/>
                <MoviesCardList
                    onCardLike={onCardLike}
                    cards={cards}
                />
                    <button
                        className="movies__more-button"
                        type='button'
                        // не знаю, какое событие на нее ставить
                    >
                        Ещё
                    </button>
                < Preloader />
            </section>
    )
}

export default Movies;
