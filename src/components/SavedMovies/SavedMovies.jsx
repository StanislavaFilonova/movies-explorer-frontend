import SearchForm from '../SearchForm/SearchForm';
import "./SavedMovies.css";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";

function SavedMovies() {

    return (
        <div>
            <section className='saved-movies'>
                <SearchForm/>
                <SavedMoviesCardList />
            </section>
        </div>
    )
}

export default SavedMovies;
