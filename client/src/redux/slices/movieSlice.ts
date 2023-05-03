import { AppThunk } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { CarouselMovie, MovieDetail } from "@/types";
import { fetchMovieDetail, fetchPopular, fetchTopRated } from "@/services";

interface MovieState {
  popular: MovieDetail[];
  topRated: MovieDetail[];
  carousel: CarouselMovie[];
  movieDetail: MovieDetail;
}

const initialState: MovieState = {
  popular: [],
  carousel: [],
  topRated: [],
  movieDetail: {},
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    cleanState: (state) => {
      state.popular = [];
      state.topRated = [];
    },
    getPopular: (state, action) => {
      state.popular = action.payload;
    },
    getTopRated: (state, action) => {
      state.topRated = action.payload;
    },
    getMoviesCarousel: (state, action) => {
      state.carousel = action.payload;
    },
    getMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
  },
});

export const getTopRatedMovies = (): AppThunk => async (dispatch) => {
  try {
    const topRated = await fetchTopRated();
    dispatch(getTopRated(topRated));
  } catch (error) {
    console.log(error);
  }
};

export const getPopularMovies = (): AppThunk => async (dispatch) => {
  try {
    const popular = await fetchPopular();
    dispatch(getPopular(popular));
  } catch (error) {
    console.log(error);
  }
};

export const getDetail =
  (id: number): AppThunk =>
  async (dispatch) => {
    try {
      const movie = await fetchMovieDetail(id);
      dispatch(getMovieDetail(movie));
    } catch (error) {
      console.log(error);
    }
  };

export const {
  getMoviesCarousel,
  getMovieDetail,
  getPopular,
  getTopRated,
  cleanState,
} = movieSlice.actions;
export default movieSlice.reducer;
