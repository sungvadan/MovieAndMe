import { API_TOKEN } from '../Helpers/token'

export function getFilmsFromApiWithSearchedText(text, page) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&query=${text}&page=${page}&language=fr-FR`
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getImageFromApi(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetail(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_TOKEN}&language=fr-FR`
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}