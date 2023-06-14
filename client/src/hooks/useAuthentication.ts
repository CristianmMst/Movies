import axios from "axios";
import { useEffect } from "react";
import { BACKEND } from "@/consts";
import { useAppDispatch, useAppSelector } from "./redux";
import { clearToken, setToken } from "@/redux/slices/userSlice";

export const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BACKEND}/profile`, {
          headers: {
            Authorization: token,
          },
        });
        dispatch(setToken({ username: data.username, token }));
      } catch (error) {
        dispatch(clearToken());
      }
    })();
  }, []);

  return {};
};
