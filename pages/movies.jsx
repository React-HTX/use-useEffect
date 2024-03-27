import React, { useState, useEffect } from "react";
import { getTrendingMovies } from "../utils/request";

function MovieList() {
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [movies, setMovies] = useState([]);
  console.log("movies:", movies);

  // fetch movies and genres
  useEffect(() => {
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
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading movies...</div>;
  }

  if (!movies || movies.length === 0) {
    return <div className="text-center">No movies found.</div>;
  }

  return (
    <div className="container max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Movie List</h1>
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
