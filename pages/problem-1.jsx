import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getTrendingMovies } from "../utils/request";

function MovieList() {
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [movies, setMovies] = useState([]);

  // While the following API call does work, it's better to use useEffect to fetch data because it's a side effect and should be done after the component is mounted. This way, you can also use the loading state to show a loading message while the data is being fetched.

  /* **********
  const fetchMovies = async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      setMovies(trendingMovies);
      setIsLoading(false); // Move loading state update here after movies are fetched
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
      setIsLoading(false);
    }
  };

  fetchMovies();
  ********** */

  // Render loading state if movies are still loading
  if (isLoading) {
    return <div className="text-center">Loading movies...</div>;
  }

  // Render message if no movies are found
  if (!movies || movies.length === 0) {
    return <div className="text-center">No movies found.</div>;
  }

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <div className="flex justify-between pt-10 pb-4">
        <div>
          <h1 className="text-4xl font-bold">Movie List</h1>
          <Link className="text-blue-500" href="/">
            Back to Home
          </Link>
        </div>
      </div>
      <ul className="grid grid-cols-3 gap-12">
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
