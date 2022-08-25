import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import "./SavedMovies.css";
import filmsFilter from '../Movies/filmsFilter';

function SavedMovies({ cards, onCardClick, onCardDelete }){
    const [initialSavedMovies, setInitialSavedMovies] = useState([]);
    const [requestSaved, setRequestSaved] = useState('');
    const [checkboxStatus, setCheckboxStatus] = useState(false);

    useEffect(() => {
        const filteredMovies = filmsFilter(cards, requestSaved, checkboxStatus);
        setInitialSavedMovies(filteredMovies);
    }, [requestSaved, checkboxStatus, cards]);

    const handleSearch = (requestSaved, checkboxStatus) => {
        setRequestSaved(requestSaved);
        setCheckboxStatus(checkboxStatus);
    };

 return (
     <div>
         <section className='saved-movies'>
             <SearchForm onSearchMovies={handleSearch}/>
             {cards.length > 0 ? (
                     <MoviesCardList
                         movies={initialSavedMovies}
                         onCardClick={onCardClick}
                         cards={initialSavedMovies}
                         setInitiaSavedlMovies={setInitialSavedMovies}
                         onCardDelete={onCardDelete}
                     />
                 ) : (
                        <span className="saved-movies__error">
                            Вы еще не сохранили ни одного фильма
                        </span>
                    )}
         </section>
     </div>
    )
}

export default SavedMovies;
