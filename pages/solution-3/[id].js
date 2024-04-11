import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { getMovieDetails } from "../../utils/request";
import Head from "next/head";

function MoviePage() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      if (!id) return;
      setIsLoading(true);
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  useEffect(() => {
    document.body.classList.add("movie-view-active");

    return () => {
      document.body.classList.remove("movie-view-active");
    };
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading movie details...</div>;
  }

  if (error) {
    return (
      <div className="text-center">
        Failed to load the movie details. Please try again later.
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center">No movie found.</div>;
  }

  return (
    <div className="container max-w-5xl mx-auto p-4">
      <Head>
        <title>{movie ? `${movie.title} - Movie Details` : "Loading..."}</title>
      </Head>
      <Link className="text-blue-500" href="/solution-3">
        Back to movies
      </Link>
      <div className="flex justify-start gap-6 items-start">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="mt-4 rounded-xl"
          priority
        />
        <div className="w-1/2 h-full">
          <h1 className="text-2xl font-bold mt-4">{movie.title}</h1>
          <p className="mt-4">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
