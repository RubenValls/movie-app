const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&query='

let movies = [];

const getMovies = () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => { 
            movies = [...data.results];
            printMovies(movies);
        })
        .catch(error => console.log(error));
}

const printMovies = (movies = []) => {
    const moviesContainer = document.querySelector('.movies-container');
    movies.forEach((movie) => {
        moviesContainer.innerHTML += `<div class="movie-card" id="${movie.original_title}">
            <img src="${IMG_PATH + movie.poster_path}" alt="test">
            <div class="movie-info">
                <h3>${movie.original_title}</h3>
                <div class="movie-rating">${movie.vote_average.toFixed(1)}</div>
            </div>
            </div>`
    })
}

getMovies()