import "./UserMovies.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
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
  const { token } = useAppSelector((state) => state.user);

  const deleteMovie = (id: string) => {
    dispatch(removeMovieUser(id, token!));
  };

  return (
    <div className="userMovies-container">
      <Link className="userMovies" to={`/movie/${movie.id}`}>
        <img src={movie.image} />
      </Link>
      <button type="button" onClick={() => deleteMovie(movie._id)}>
        x
      </button>
    </div>
  );
};
