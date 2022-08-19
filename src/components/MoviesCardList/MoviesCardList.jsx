import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList ({ onCardLike, cards }) {
    return(
        <section className='movies-list'>
            <ul className='movies-list__cards'>
                {cards.map((card) => (
                    <MoviesCard
                        key={card.id}
                        card={card}
                        onCardLike={onCardLike}
                        name={card.nameRU}
                        duration={card.duration}
                        {...card}
                    />
                ))}
            </ul>
        </section>
    )
}

export default MoviesCardList;
