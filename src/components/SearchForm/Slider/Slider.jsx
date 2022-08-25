import './Slider.css';

function Slider({shotMovies,setShortMovies,onChange}) {
    // Функция, которая включает фильтрацию фильмов по длительности
    // eslint-disable-next-line
    function checkboxHandler() {
        setShortMovies(!shotMovies);
    }
    // -----------------------------------------------------------------------------------------------------------------
    return (
        <label className='switch'>
            <input
                type='checkbox'
                onChange={onChange}
                checked={shotMovies && 'checked'}
            />
            <span className='slider'/>
        </label>
    );
}

export default Slider;
