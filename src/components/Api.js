class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getProfile() {

        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)

    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)

    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(console.log)

    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
        authorization: 'd0911b03-b62b-4bf7-b304-82194d9acc6e',
        'Content-Type': 'application/json'
    }
}); 