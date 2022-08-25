class Api {
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
     * Метод получения карточек-фильмов с сервера
     */
    getMoviesCards() {
        return fetch(`${this._baseUrl}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export default api;
