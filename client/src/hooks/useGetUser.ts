import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { setUserFetch } from "@/redux/slices/userSlice";

export const useGetUser = () => {
  const dispatch = useAppDispatch();
  const { token, _id, movies } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(setUserFetch(token!));
  }, []);

  return { token, _id, movies };
};
