type MovieType = "save" | "favorite";

export interface User {
  _id: string;
  email: string;
  movies: Movies[];
  token: string | null;
  username: string | null;
}

export interface Movies {
  id: string;
  _id: string;
  image: string;
  userId: string;
  type: MovieType;
}
