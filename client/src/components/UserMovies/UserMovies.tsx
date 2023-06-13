import "./UserMovies.scss";
import { Link } from "react-router-dom";
import image from "@/assets/default.svg";
import { useAppDispatch } from "@/hooks/redux";
import { removeMovieUser } from "@/redux/slices/userSlice";

interface UserMoviesProps {
  movie: {
    id: string;
    _id: string;
    image: string;
  };
}

export const UserMovies = ({ movie }: UserMoviesProps) => {
  const dispatch = useAppDispatch();

  const deleteMovie = (id: string) => {
    dispatch(removeMovieUser(id));
  };

  return (
    <div className="userMovies-container">
      <Link className="userMovies" to={`/movie/${movie.id}`}>
        {movie.image ? (
          <img className="userMovies-img" src={movie.image} alt="movie" />
        ) : (
          <div className="userMovies-default">
            <img className="userMovies-default-img" src={image} alt="movie" />
          </div>
        )}
      </Link>
      <button type="button" onClick={() => deleteMovie(movie._id)}>
        x
      </button>
    </div>
  );
};
