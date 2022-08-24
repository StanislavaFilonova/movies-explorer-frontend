const MOVIES_IMAGE_BASE_URL = 'https://api.nomoreparties.co';

class MainApi {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // Возврат ответа об ошибке от сервера
    _checkResponse(res) {
        if (res.ok) {
            // Метод .json принимает предоставленный JSON, строит его и отправляет его клиенту
            return res.json();
        }
        // Promise  позволяет создать обертку для значения, который еще не известен при создании промиса. Нужен дял асинхронных операций
        return Promise.reject(
            `Ошибка: ${res.statusText}, с кодом: ${res.status}`
        );
    }

    /**
     * Метод получения информации о текущем пользователе (кто авторизован) на сервере
     * Api метод чтения инфо о пользователе (для заполнения currentUser в App.jsx
     */
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method:"GET",
            headers: {
                Accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }

    /**
     * Метод редактирования профиля пользователя
     * API функция для изменения профиля пользователя (со страницы профиля при нажатии на кнопку сохранения)
     * @param {Object} userData Данные о пользователе
     */
    editProfile(userData) {
        if (!userData.name) {
            console.error(
                "MainApi.editProfile в аргументе userData не передано обязательное поле 'name'. Запрос не будет выполнен."
            );
            return;
        }
        if (!userData.email) {
            console.error(
                "MainApi.editProfile в аргументе userData не передано обязательное поле 'email'. Запрос не будет выполнен."
            );
            return;
        }
        const url = `${this._baseUrl}/users/me`;

        const opts = {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        };
        return fetch(url, opts).then(this._checkResponse);
    }

    /**
     * Метод постановки лайка на фильм => перенос фильма в коллекцию сохраненных
     * @param {String} movie фильм
     */
    putMovieLike(movie){
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify(movie),
        }).then(this._checkResponse);
    }

    /**
     * Метод получения информации о сохраненных фильмах пользователя с сервера
     * Api метод чтения инфо о пользователе (для заполнения currentUser в App.jsx
     */
    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: {
                Accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }

    /**
     * Метод удаления фильма
     */
    deleteMovies(movie) {
        return fetch(`${this._baseUrl}/movies/${movie._id}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }
}

// создание экземпляра класса Api
const mainApi = new MainApi({
    baseUrl: 'https://diploma-movies-filonova.nomoredomains.xyz',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default mainApi;
