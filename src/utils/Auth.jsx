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
    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
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
}

const auth = new Auth({
    // baseUrl: "https://auth.nomoreparties.co",
    baseUrl: "http://localhost:3000/",
});

export default auth;
