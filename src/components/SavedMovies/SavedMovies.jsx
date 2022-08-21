import SearchForm from '../SearchForm/SearchForm';
import "./SavedMovies.css";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";

function SavedMovies({savedCards}) {

    return (
        <div>
            <section className='saved-movies'>
                <SearchForm/>
                <SavedMoviesCardList
                    savedCards={savedCards}
                />
            </section>
        </div>
    )
}

export default SavedMovies;
