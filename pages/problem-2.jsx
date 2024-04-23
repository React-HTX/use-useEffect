import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getTrendingMovies,
  getGenres,
  getMoviesByGenre,
} from "../utils/request";

function MovieList() {
  const [isLoading, setIsLoading] = useState(true); // Note: Loading state used to indicate if data is being fetched
  const [movies, setMovies] = useState([]); // Note: State holding the fetched movies
  const [genres, setGenres] = useState("all"); // Note: State holding movie genres
  const [selectedGenre, setSelectedGenre] = useState("all"); // Note: State holding the currently selected genre
  const [title, setTitle] = useState("Trending Movies");

  // fetch movies and genres
  useEffect(() => {
    const fetchMoviesAndGenres = async () => {
      try {
        const trendingMovies = await getTrendingMovies();
        const genres = await getGenres();
        setMovies(trendingMovies);
        setIsLoading(false); // Move loading state update here after movies are fetched
        setGenres(genres);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesAndGenres();
  }, []); // Note: Empty dependency array indicates this effect runs only once on component mount

  // While the following API call does work, it's better to use useEffect to fetch data because it's a side effect and should be done after the component is mounted. Also, this function should only run when the selected genre changes.

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (selectedGenre === "all") {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
        setTitle("Trending Movies");
        return;
      }
      const moviesByGenre = await getMoviesByGenre(selectedGenre);
      const genreName = genres.find((g) => g.id == selectedGenre).name;
      setTitle(`Trending ${genreName} Movies`);
      setMovies(moviesByGenre);
    };

    fetchMoviesByGenre();
  }, [selectedGenre]);

  // useEffect to filter movies based on genre
  if (isLoading) {
    return <div className="text-center">Loading movies...</div>;
  }

  if (!movies || movies.length === 0) {
    return <div className="text-center">No movies found.</div>;
  }

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    // Implement filtering logic here if you want to filter movies based on the selected genre
  };

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex justify-between pt-10 pb-4">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <Link className="text-blue-500" href="/">
            Back to Home
          </Link>
        </div>
        <div>
          <label
            htmlFor="genre-select"
            className="block mb-2 text-sm font-medium text-white"
          >
            Select a genre:
          </label>
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="all">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-x-12 gap-y-2">
        {movies.map((movie) => (
          <li key={movie.id} className="mb-6">
            <div className="">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="mt-2 rounded-xl shadow-lg"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="truncate overflow-hidden whitespace-nowrap">
                  {movie.overview}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;