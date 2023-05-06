import { useEffect } from "react";
import { Navbar } from "@/components";
import { Detail } from "@/components";
import { useParams } from "react-router-dom";
import { getDetail } from "@/redux/slices/movieSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetUser } from "@/hooks/useGetUser";

export const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { _id, token, movies } = useGetUser();
  const { movieDetail } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getDetail(+id!));
  }, []);

  return (
    <>
      <Navbar active={true} />
      {Object.keys(movieDetail).length && movies.length > 0 && token && (
        <Detail movie={movieDetail} movies={movies} user={{ _id, token }} />
      )}
    </>
  );
};
