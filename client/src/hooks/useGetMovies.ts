import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getTopRated, getPopular } from "@/redux/slices/movieSlice";
import { getMovieDetail, getMoviesCarousel } from "@/redux/slices/movieSlice";
import { fetchCarousel, fetchTopRated, fetchPopular } from "@/services";

export const useGetMovies = () => {
  const dispatch = useAppDispatch();
  const { carousel, movieDetail, popular, topRated } = useAppSelector(
    (state) => state.movies
  );
  useEffect(() => {
    (async () => {
      const popular = await fetchPopular();
      const carousel = await fetchCarousel();
      const nowPlaying = await fetchTopRated();

      dispatch(getMovieDetail({}));
      dispatch(getPopular(popular!));
      dispatch(getTopRated(nowPlaying!));
      dispatch(getMoviesCarousel(carousel!));
    })();
  }, []);

  return { carousel, movieDetail, popular, topRated };
};
