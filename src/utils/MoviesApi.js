import { BASE_URL } from '../utils/constants';

class MoviesApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`)
      .then(this._checkResponse)
      .catch(err => console.log(err))
  }

}

export const api = new MoviesApi(BASE_URL);
