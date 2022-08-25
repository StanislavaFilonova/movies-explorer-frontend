function filmsFilter(movies, request, checkboxStatus) {
    let filmsFilter = movies;
    let result;
    if (checkboxStatus) {
        filmsFilter = filmsFilter.filter((movie) => movie.duration <= 40);
    }

    result = filmsFilter.filter((movie) => {
        return movie.nameRU.toLowerCase().indexOf(request.toLowerCase()) !== -1;
    })
    return result;
}

export default filmsFilter;
