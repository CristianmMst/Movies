import { useEffect } from "react";
import { Detail } from "@/components";
import { useParams } from "react-router-dom";
import { getDetail } from "@/redux/slices/movieSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

export const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { movieDetail } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getDetail(+id!));
  }, []);

  return (
    <>{Object.keys(movieDetail).length && <Detail movie={movieDetail} />}</>
  );
};
