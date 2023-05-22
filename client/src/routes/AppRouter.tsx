import PrivateRoute from "./PrivateRoute";
import { SignIn, LogIn } from "@/components";
import { Route, Routes } from "react-router-dom";
import { Home, MovieDetail, Movies, NotFound, Profile, Search } from "@/pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/movies" element={<Search />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/movies/:category" element={<Movies />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
