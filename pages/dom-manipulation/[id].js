import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { getMovieDetails } from "../../utils/request";

function MoviePage() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return; // Exit early if id is not yet available

      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // useEffect for DOM manipulation
  useEffect(() => {
    if (movie) {
      document.title = `${movie.title} - Movie Details`; // Dynamically update the document title with the movie's title
    }

    // Optional: Clean-up function to reset the document title when the component unmounts
    return () => {
      document.title = "Original Title Here"; // Reset to your site's default title or another appropriate title
    };
  }, [movie]); // This effect depends on the `movie` state

  if (isLoading) {
    return <div className="text-center">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="text-center">No movie found.</div>;
  }

  return (
    <div className="container max-w-5xl mx-auto p-4">
      <Link className="text-blue-500" href="/dom-manipulation">
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
