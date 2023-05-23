import { Movie } from "@/components";
import { MovieDetail } from "@/types";
import { useEffect, useState } from "react";
import { fetchSearchMovie } from "@/services";
import { useLocation } from "react-router-dom";

export const Search = () => {
  const { search } = useLocation();
  const [movies, setMovies] = useState<MovieDetail[]>();
  const queryValue = new URLSearchParams(search).get("query");

  useEffect(() => {
    setMovies([]);
    (async () => {
      const movies = await fetchSearchMovie(queryValue!);
      setMovies(movies?.results);
    })();
  }, [search]);

  return (
    <div className="Movies">
      {movies?.map((movie, index) => (
        <Movie key={index} movie={movie} />
      ))}
    </div>
  );
};
