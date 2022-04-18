const tmdbKey = 'ac596957d4b45a3f673019380799c748';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams =  `?api_key=${tmdbKey}`;
    const urlToFetch =  `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
   
    try{
       const response = await fetch(urlToFetch);
       if(response.ok){
           const jsonResponse = await response.json();
           const genres = jsonResponse.genres
           return genres;
       }

    }catch(error){
        console.log(error) 
    }
}

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genre=${selectedGenre}`
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`
  try{
      const response = await fetch(urlToFetch);
      if(response.ok){
        const jsonResponse = await response.json();
        const movies = jsonResponse.results;
       return movies;
    }
  }catch(error){
    console.log(error);
  }

};

const getMovieInfo = async (movies) => {
    const movieId = movies.id;
    const movieIdEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieIdEndpoint}${requestParams}`;
    try{
        const response = await fetch(urlToFetch)
        if(response.ok){
            const jsonResponse = await response.json();
            const movieInfo = jsonResponse;
            return movieInfo;
        }

    }catch(error){
        console.log(error)
    }

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);

};



getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;