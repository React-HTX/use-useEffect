import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getTrendingMovies,
  getGenres,
  getMoviesByGenre,
} from "../utils/request";

function MovieList() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("all");

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
  }, []);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (selectedGenre === "all") {
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
        return;
      }

      const moviesByGenre = await getMoviesByGenre(selectedGenre);
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
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold my-4">Movie List</h1>
        <div className="mb-4">
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
