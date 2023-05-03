import { useEffect } from "react";
import { useAppDispatch } from "./redux";
import { getTopRated, getPopular } from "@/redux/slices/movieSlice";
import { getMovieDetail, getMoviesCarousel } from "@/redux/slices/movieSlice";
import { fetchCarousel, fetchTopRated, fetchPopular } from "@/services";

export const useGetMovies = () => {
  const dispatch = useAppDispatch();
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
};
