import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { getMovieDetails } from "../../utils/request";

function MoviePage() {
  const router = useRouter();
  const { id } = router.query; // Note: Destructuring router.query to get the 'id' parameter
  const [movie, setMovie] = useState(null); // Note: State to hold movie details
  const [isLoading, setIsLoading] = useState(true); // Note: Loading state

  // useEffect to fetch movie details when 'id' changes
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
  }, [id]); // This effect runs whenever `id` changes

  // While the code below works, it's better to use useEffect to update the document title when the movie state changes. This way, the title will be updated when the movie details are fetched.

  /* **********
    if (movie) {
      document.title = `${movie.title} - Movie Details`; // Dynamically update the document title with the movie's title
    }

    // Optional: Clean-up function to reset the document title when the component unmounts
    return () => {
      document.title = "Original Title Here"; // Reset to your site's default title or another appropriate title
    };
  ********** */

  if (isLoading) {
    return <div className="text-center">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="text-center">No movie found.</div>;
  }

  return (
    <div className="container max-w-5xl mx-auto p-4">
      <Link className="text-blue-500" href="/problem-3">
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
