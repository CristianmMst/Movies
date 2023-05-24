import "./Movie.scss";
import { MovieDetail } from "@/types";
import { Link } from "react-router-dom";
import image from "@/assets/default.svg";
import { API_IMAGE_POSTER } from "@/consts";

interface MoviesProps {
  movie: MovieDetail;
}

export const Movie = ({ movie }: MoviesProps) => {
  return (
    <Link className="Movie" to={`/movie/${movie.id}`}>
      {movie.poster_path ? (
        <img
          className="Movie-image"
          src={`${API_IMAGE_POSTER}${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <div className="Movie-image-default">
          <img
            className="Movie-image-default-img"
            src={image}
            alt={movie.title}
          />
        </div>
      )}

      <div className="Movie-content">
        <p className="Movie-content-title">{movie.title}</p>
        <p className="Movie-content-date">{movie.release_date}</p>
      </div>
    </Link>
  );
};

export default Movie;
