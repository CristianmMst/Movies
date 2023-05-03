import axios from "axios";
import { BACKEND } from "@/consts";

export const login = async (user: { email: string; password: string }) => {
  const { data } = await axios.post(`${BACKEND}/auth/login`, user);
  return data;
};

export const signin = async (user: { email: string; password: string }) => {
  const { data } = await axios.post(`${BACKEND}/auth/signin`, user);
  return data;
};
