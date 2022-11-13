import { options } from '../utils/constants';

class MainApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    try {
      return res.json()
      .then(data => {
        return Promise.reject(`Ошибка: ${data.message}`);
      });
    } catch {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse)
      .catch(err => console.log(err))
  }

  postMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers : this._headers,
      credentials: 'include',
      body: JSON.stringify(movie),
    })
      .then(this._checkResponse)

  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(this._checkResponse)

  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password,
        email
      })
    })
      .then(this._checkResponse);

  }

  register({ email, username, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        password,
        email,
        name: username
      })
    })
      .then(this._checkResponse)

  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse)
      .catch(error => console.log(error));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse)
      .catch(err => console.log(err))
  }

  updateUserInfo({ email, username }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        name: username,
      }),
    })
      .then(this._checkResponse)

  }

}

export const api = new MainApi(options);
