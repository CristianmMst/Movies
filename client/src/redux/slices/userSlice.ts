import { AppThunk } from "../store";
import { MovieDetail, User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChangeUsername,
  fetchCreateMovie,
  fetchDeleteMovie,
  fetchUserData,
} from "@/services";

const initialState: User = {
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
    changeUsername: (state, { payload }) => {
      state.username = payload;
      localStorage.up("username", payload);
    },
    createMovie: (state, { payload }) => {
      state.movies = [...state.movies, payload];
    },
    removeMovie: (state, { payload }) => {
      state.movies = state.movies.filter((m) => m.id !== payload.id);
    },
  },
});

export const setUserFetch = (): AppThunk => async (dispatch) => {
  try {
    const userData = await fetchUserData();
    dispatch(setUser(userData));
  } catch (error) {
    console.log(error);
  }
};

export const renameUsername =
  (username: string): AppThunk =>
  async (dispatch) => {
    try {
      await fetchChangeUsername(username);
      dispatch(changeUsername(username));
    } catch (error) {
      console.log(error);
    }
  };

export const createMovieUser =
  (movie: MovieDetail): AppThunk =>
  async (dispatch) => {
    try {
      const data = await fetchCreateMovie(movie);
      dispatch(createMovie(data));
    } catch (error) {
      console.log(error);
    }
  };

export const removeMovieUser =
  (id: string, _id: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await fetchDeleteMovie(id);
      dispatch(removeMovie(response));
    } catch (error) {
      console.log(error);
    }
  };

export const {
  setToken,
  clearToken,
  setUser,
  removeMovie,
  createMovie,
  changeUsername,
} = userSlice.actions;

export default userSlice.reducer;
