class Auth {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    // Возврат ответа об ошибке от сервера
    _checkResponse = (res) => {
        if (res.ok) {
            // Метод .json принимает предоставленный JSON, строит его и отправляет его клиенту
            return res.json();
        }
        // Promise  позволяет создать обертку для значения, который еще не известен при создании промиса. Нужен для асинхронных операций
        return Promise.reject(res);
    };

    /**
     * Метод запроса для регистрации пользователя на сервере
     * @param {String} name Имя пользователя, небходимое для регистрации
     * @param {String} email Почтовый адрес пользователя, необходимый для регистрации
     * @param {String} password Пароль пользователя, необходимый для регистрации
     */
    register({name, email, password}) {
        return fetch(`${this._baseUrl}/sign-up`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        }).then(this._checkResponse);
    }

    /**
     * Метод запроса для авторизации пользователя на сервере
     * @param {String} email Почтовый адрес пользователя, необходимый для авторизации
     * @param {String} password Пароль пользователя, необходимый для авторизации
     */
    login(email, password) {
        return fetch(`${this._baseUrl}/sign-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then(this._checkResponse);
    }

    /**
     * Метод запроса для проверки валидности токена и получения email для вставки в шапку сайта
     * @param {String} token Токен пользователя, необходимый для авторизации/регистрации
     */
    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            //эдпойнт
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then(this._checkResponse);
    }
}

const auth = new Auth({
    // baseUrl: "https://auth.nomoreparties.co",
    baseUrl: "https://diploma-movies-filonova.nomoredomains.xyz",
});

export default auth;
