import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Movie, Navbar } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanState,
  getPopularMovies,
  getTopRatedMovies,
} from "@/redux/slices/movieSlice";

export function Movies() {
  const { category } = useParams();
  const dispatch = useAppDispatch();
  const { popular, topRated } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(cleanState());
    category === "popular"
      ? dispatch(getPopularMovies())
      : dispatch(getTopRatedMovies());
  }, [category]);

  return (
    <div className="Movies">
      <Navbar active />
      {category === "popular"
        ? popular.map((movie, index) => <Movie key={index} movie={movie} />)
        : topRated.map((movie, index) => <Movie key={index} movie={movie} />)}
    </div>
  );
}

export default Movies;
