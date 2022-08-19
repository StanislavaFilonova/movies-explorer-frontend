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
     * Метод постановки лайка на фильм => перенос фильма в коллекцию сохраненных
     * @param {String} movie фильм
     */
    putMovieLike(movie){
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                credentials: 'include',
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify(movie),
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
