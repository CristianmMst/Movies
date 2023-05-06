import "./Detail.scss";
import { MovieDetail } from "@/types";
import { FaBookmark } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import {
  Movie,
  createMovieUser,
  removeMovieUser,
} from "@/redux/slices/userSlice";
import { API_IMAGE, API_IMAGE_POSTER_DETAIL } from "@/consts";
import { averagePercentage, toHoursAndMinutes } from "@/utils/movie";
import { useEffect, useState } from "react";

export const Detail = ({
  movie,
  movies,
  user,
}: {
  movie: MovieDetail;
  movies: Movie[];
  user: {
    token: string;
    _id: string;
  };
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [movieIsSave, setMovieIsSave] = useState(false);
  const [movieIsFavorite, setMovieIsFavorite] = useState(false);

  useEffect(() => {
    const movieIsFavorite = movies
      .filter((m) => m.type === "favorite")
      .find((m) => +m.id === movie.id);
    const movieIsSave = movies
      .filter((m) => m.type === "save")
      .find((m) => +m.id === movie.id);
    setMovieIsSave(!!movieIsSave);
    setMovieIsFavorite(!!movieIsFavorite);
  }, []);

  const onClick = (type: string) => {
    if (user.token) {
      const movieFind: any = movies.find((m) => +m.id === movie.id);
      if (movieFind) {
        dispatch(removeMovieUser(movieFind._id, user.token));
        type === "favorite" ? setMovieIsFavorite(false) : setMovieIsSave(false);
      } else {
        const createMovie = {
          id: movie.id,
          type: type,
          userId: user._id,
          image: `${API_IMAGE_POSTER_DETAIL}${movie?.poster_path}`,
        };
        type === "favorite" ? setMovieIsFavorite(true) : setMovieIsSave(true);
        dispatch(createMovieUser(createMovie, user.token));
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
      <img
        className="Detail-img"
        src={`${API_IMAGE_POSTER_DETAIL}${movie?.poster_path}`}
        alt={`${movie?.title}`}
      />
      <section className="Detail-content">
        <div className="Detail-content-title">
          <h1>
            {movie?.title} ({movie?.release_date?.split("-")[0]})
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
                color={`${movieIsFavorite ? "red" : "white"}`}
              />
              <span className="Detail-buttons-tooltip">Favoritos</span>
            </button>
            <button
              className="Detail-buttons-button"
              onClick={() => onClick("save")}
            >
              <FaBookmark
                size={20}
                color={`${movieIsSave ? "yellow" : "white"}`}
              />
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
