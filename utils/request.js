// READ THE REQUESTS.md file for API route information and example of usage
// Use this file to make Http request using the fetch API

const API_KEY = "9d2acf4d7102536ac39921aa41b1a275";
const MOVIES_URL = "https://api.themoviedb.org/3/";
// const API_KEY = process.env.MOVIE_API_KEY
// const MOVIES_URL = process.env.BASE_URL
export const getTrendingMovies = async () => {
  const res = await fetch(
    `${MOVIES_URL}/trending/movie/day?language=en-US&api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
};
export const getMovies = async (query) => {
  const res = await fetch(
    `${MOVIES_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
};
export const getMovieDetails = async (id) => {
  const res = await fetch(`${MOVIES_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};
export const getSimilarMovies = async (id) => {
  const res = await fetch(
    `${MOVIES_URL}/movie/${id}/similar?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
};
export const getGenres = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch genres");
    }
    const data = await res.json();
    return data.genres; // Note: The key for accessing genres list is 'genres', not 'results'
  } catch (error) {
    console.error("Error fetching genres:", error);
    return []; // Return an empty array or handle the error as appropriate for your application
  }
};

export const getMoviesByGenre = async (genreId) => {
  const res = await fetch(
    `${MOVIES_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );
  const data = await res.json();
  return data.results;
};
