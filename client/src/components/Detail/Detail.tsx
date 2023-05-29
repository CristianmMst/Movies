import "./Detail.scss";
import { MovieDetail } from "@/types";
import image from "@/assets/default.svg";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import { useGetUser } from "@/hooks/useGetUser";
import { API_IMAGE, API_IMAGE_POSTER_DETAIL } from "@/consts";
import { averagePercentage, toHoursAndMinutes } from "@/utils/movie";
import { createMovieUser, removeMovieUser } from "@/redux/slices/userSlice";

export const Detail = ({ movie }: { movie: MovieDetail }) => {
  const { user } = useGetUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user.movies && user.movies.length > 0) {
      setIsFavorite(!!user.movies.find((m) => +m.id === movie.id));
    }
  }, [user.movies]);

  const addFavoriteMovie = () => {
    if (!user.token) return navigate("/login");

    const movieFind = user.movies.find((m) => +m.id === movie.id);
    if (movieFind) {
      dispatch(removeMovieUser(movieFind._id, user.token));
      setIsFavorite(false);
    } else {
      const createMovie = {
        id: movie.id,
        userId: user._id,
        image: movie.poster_path
          ? `${API_IMAGE_POSTER_DETAIL}${movie?.poster_path}`
          : null,
      };
      dispatch(createMovieUser(createMovie, user.token));
      setIsFavorite(true);
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
              type="button"
              className="Detail-buttons-button"
              onClick={addFavoriteMovie}
            >
              <AiFillHeart
                size={20}
                color={`${isFavorite ? "red" : "white"}`}
              />
              <span className="Detail-buttons-tooltip">Favoritos</span>
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
