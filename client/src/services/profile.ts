import axios from "axios";
import { BACKEND } from "@/consts";
import { MovieDetail } from "@/types";

const token = localStorage.getItem("token");

export const fetchUserData = async () => {
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

export const fetchChangeUsername = async (username: string) => {
  try {
    const { data } = await axios.put(
      `${BACKEND}/profile`,
      { username },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteMovie = async (id: string) => {
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

export const fetchCreateMovie = async (movie: MovieDetail) => {
  try {
    const { data } = await axios.post(`${BACKEND}/profile/movies`, movie, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
