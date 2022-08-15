import './SearchForm.css';

function SearchForm() {
    return (
        <section className='search__section'>

            <div className='search'>
                <form className='search__form' noValidate=''>
                    <input className='search__input'
                           required
                           placeholder='Фильм'
                           type='text'
                           defaultValue=''
                    />
                    <button className='search__button false' type='submit'>Поиск</button>
                    <span className='search__error'></span>
                </form>
            </div>
            <div className='search__tumbler-box'>
                <label className='search__checkbox'>
                    <input type='checkbox' className='search__checkbox-input'/>
                    <span className='search__checkbox-slider'></span>
                </label>
                <p className='search__text'>Короткометражки</p>
            </div>

        </section>
    );
}

export default SearchForm;
