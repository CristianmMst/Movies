import { API_URL, API_KEY } from "@/consts";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
    language: "es",
  },
});
