type MovieType = "save" | "favorite";

export interface User {
  _id: string;
  email: string;
  movies: UserMovies[];
  token: string | null;
  username: string | null;
}

export interface UserMovies {
  id: string;
  _id: string;
  image: string;
  userId: string;
  type: MovieType;
}
