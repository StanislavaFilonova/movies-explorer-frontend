import React from "react";
import '../MoviesCardList/MoviesCardList.css';
import SavedMovieCard from "../SavedMovieCard/SavedMovieCard";

function SavedMoviesCardList () {
    return(
        <section className='saved-movies-list'>
            <ul className='saved-movies-list__cards'>
                <SavedMovieCard />
                <SavedMovieCard />
                <SavedMovieCard />
            </ul>
        </section>
    )
}

export default SavedMoviesCardList;
