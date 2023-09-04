const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&query='

const searchInput = document.querySelector('#movie-search');
const searchIcon = document.querySelector('#search-icon');
const overviewIcon = document.querySelector('#overview-icon');
let overview = false;
let movies = [];

const getMovies = (API = API_URL, query = '') => {
    fetch(API + query)
        .then(response => response.json())
        .then(data => {
            movies = [...data.results];
            console.log(movies);
            printMovies(movies);
        })
        .catch(error => console.log(error));
}

const searchMovies = async (query) => {
    getMovies(SEARCH_API, query)
}

const printMovies = (movies = []) => {
    const moviesContainer = document.querySelector('.movies-container');
    moviesContainer.innerHTML = '';
    movies.forEach((movie) => {
        let ratingColor = movie.vote_average < 5
                            ? '#FF0000'
                            : movie.vote_average >= 8
                                ? '#90EE90'
                                : '#FFA500'
        moviesContainer.innerHTML += `<div class="movie-card" id="${movie.title}">
            <img src="${movie.poster_path ? IMG_PATH + movie.poster_path : 'assets/no-image.png'}" alt="test">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="movie-rating" style="color: ${ratingColor}">${movie.vote_average.toFixed(1)}</div>
            </div>
            <i class="fa-solid fa-sort-up fa-lg" style="color: white;" id="overview-icon"></i>
            <div class="movie-overview">
                    <h3>Overview</h3>
                    <p>${movie.overview}</p>
                </div>
            </div>`
    })
}

getMovies()

searchInput.addEventListener('keydown', (event) => {
    if(event.keyCode === 13){
        searchMovies(searchInput.value)
        searchInput.value = '';
    }
})

searchIcon.addEventListener('click', () => {
    searchMovies(searchInput.value)
    searchInput.value = '';
})

overviewIcon.addEventListener('click', () => {
    if(!overview){
        searchIcon.classList = 'fa-solid fa-sort-down fa-lg';
        searchIcon.style.color = 'black';
    }else{
        searchIcon.classList = 'fa-solid fa-sort-up fa-lg';
        searchIcon.style.color = 'white';
    }
    overview = !overview;
})