import { AppThunk } from "../store";
import { MovieDetail } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCreateMovie, fetchDeleteMovie, fetchUserData } from "@/services";

export interface Movie {
  id: string;
  _id: string;
  image: string;
  type: "save" | "favorite";
}
interface UserState {
  _id: string;
  email: string;
  token: string | null;
  username: string | null;
  movies: Movie[];
}

const initialState: UserState = {
  _id: "",
  email: "",
  token: localStorage.getItem("token") || null,
  username: localStorage.getItem("username") || null,
  movies: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, { payload: { username, token } }) => {
      state.token = token;
      state.username = username;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    },
    setUser: (state, { payload }) => {
      state._id = payload._id;
      state.email = payload.email;
      state.movies = payload.movies;
      state.username = payload.username;
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
    removeMovie: (state, { payload }) => {
      state.movies = payload.movies;
    },
  },
});

export const setUserFetch =
  (token: string): AppThunk =>
  async (dispatch) => {
    try {
      const userData = await fetchUserData(token);
      dispatch(setUser(userData));
    } catch (error) {
      console.log(error);
    }
  };

export const createMovieUser =
  (movie: MovieDetail, token: string): AppThunk =>
  async (dispatch) => {
    try {
      await fetchCreateMovie(movie, token);
    } catch (error) {
      console.log(error);
    }
  };

export const removeMovieUser =
  (id: string, _id: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetchDeleteMovie(id, _id);
      dispatch(removeMovie(response));
    } catch (error) {
      console.log(error);
    }
  };

export const { setToken, clearToken, setUser, removeMovie } = userSlice.actions;

export default userSlice.reducer;
