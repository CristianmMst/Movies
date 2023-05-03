import axios from "axios";
import { BACKEND } from "@/consts";
import { MovieDetail } from "@/types";

export const fetchUserData = async (token: string) => {
  try {
    const { data } = await axios.get(`${BACKEND}/profile`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteMovie = async (id: string, token: string) => {
  try {
    const { data } = await axios.delete(`${BACKEND}/profile/movies/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCreateMovie = async (movie: MovieDetail, token: string) => {
  try {
    await axios.post(`${BACKEND}/profile/movies`, movie, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
