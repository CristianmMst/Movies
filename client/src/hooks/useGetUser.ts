import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { setUserFetch } from "@/redux/slices/userSlice";

export const useGetUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(setUserFetch(user.token!));
  }, []);

  return { user };
};
