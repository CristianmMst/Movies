import "./Detail.scss";
import { MovieDetail } from "@/types";
import image from "@/assets/default.svg";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import { useGetUser } from "@/hooks/useGetUser";
import { createMovieUser, removeMovieUser } from "@/redux/slices/userSlice";
import { API_IMAGE, API_IMAGE_POSTER_DETAIL } from "@/consts";
import { averagePercentage, toHoursAndMinutes } from "@/utils/movie";

export const Detail = ({ movie }: { movie: MovieDetail }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { _id, token, movies } = useGetUser();
  const [isSave, setIsSave] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsSave(!!movies.find((m) => +m.id === movie.id && m.type === "save"));
    setIsFavorite(
      !!movies.find((m) => +m.id === movie.id && m.type === "favorite")
    );
  }, [movies]);

  const onClick = (type: string) => {
    if (token) {
      const movieFind = movies.find((m) => +m.id === movie.id);

      if (movieFind) {
        dispatch(removeMovieUser(movieFind._id, token));
        type === "favorite" ? setIsFavorite(false) : setIsSave(false);
      } else {
        const createMovie = {
          id: movie.id,
          type: type,
          userId: _id,
          image: movie.poster_path
            ? `${API_IMAGE_POSTER_DETAIL}${movie?.poster_path}`
            : null,
        };
        type === "favorite" ? setIsFavorite(true) : setIsSave(true);
        dispatch(createMovieUser(createMovie, token));
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="Detail">
      <img
        className="Detail-background"
        src={`${API_IMAGE}${movie?.backdrop_path}`}
        alt={`${movie?.title}`}
      />
      {movie.poster_path ? (
        <img
          className="Detail-img"
          src={`${API_IMAGE_POSTER_DETAIL}${movie?.poster_path}`}
          alt={`${movie?.title}`}
        />
      ) : (
        <div className="Detail-default">
          <img
            src={image}
            className="Detail-default-img"
            alt={`${movie?.title}`}
          />
        </div>
      )}

      <section className="Detail-content">
        <div className="Detail-content-title">
          <h1>
            {movie?.title}{" "}
            {movie.release_date
              ? `(${movie?.release_date?.split("-")[0]})`
              : ""}
          </h1>
          <div>
            {movie?.genres?.map((genre, index, genres) => {
              return (
                <p key={index}>
                  {index === genres.length - 1
                    ? `${genre.name}.`
                    : `${genre.name},`}
                </p>
              );
            })}
            <span>{toHoursAndMinutes(movie.runtime)}</span>
          </div>
        </div>
        <div className="Detail-actions">
          <div className="Detail-actions-percentage">
            <h4>{averagePercentage(movie?.vote_average!)}</h4>
            <span>Puntuación</span>
          </div>
          <div className="Detail-buttons">
            <button
              className="Detail-buttons-button"
              onClick={() => onClick("favorite")}
            >
              <AiFillHeart
                size={20}
                color={`${isFavorite ? "red" : "white"}`}
              />
              <span className="Detail-buttons-tooltip">Favoritos</span>
            </button>
            <button
              className="Detail-buttons-button"
              onClick={() => onClick("save")}
            >
              <FaBookmark size={20} color={`${isSave ? "yellow" : "white"}`} />
              <span className="Detail-buttons-tooltip">Guardar</span>
            </button>
          </div>
        </div>
        <div className="Detail-info">
          <h1>Resumen</h1>
          <p>{movie?.overview}</p>
        </div>
      </section>
    </div>
  );
};

export default Detail;
