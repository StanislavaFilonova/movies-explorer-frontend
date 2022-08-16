import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import React from "react";
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from "../Preloader/Preloader";

function Movies() {
    return (
            <section className="movies">
                <SearchForm/>
                <MoviesCardList />
                    <button
                        className="movies__more-button"
                        type='button'
                    >
                        Ещё
                    </button>
                < Preloader />
            </section>
    )
}

export default Movies;
