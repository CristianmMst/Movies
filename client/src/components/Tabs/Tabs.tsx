import "./Tabs.scss";
import { useState } from "react";
import empty from "@/assets/noData.svg";
import { useAppSelector } from "@/hooks/redux";
import { UserMovies } from "../UserMovies/UserMovies";

export const Tabs = () => {
  const { movies } = useAppSelector((state) => state.user);
  const [tabIndex, setTabIndex] = useState<number>(1);

  const toggleTab = (index: number) => {
    setTabIndex(index);
  };

  return (
    <section className="Tabs">
      <ul className="Tabs-links">
        <li
          className={
            tabIndex === 1 ? "Tabs-links-link link-active" : "Tabs-links-link"
          }
          onClick={() => toggleTab(1)}
        >
          Guardado
        </li>
        <li
          className={
            tabIndex === 2 ? "Tabs-links-link link-active" : "Tabs-links-link"
          }
          onClick={() => toggleTab(2)}
        >
          Favoritos
        </li>
      </ul>
      <div className="Tabs-content-container">
        <div
          className={
            tabIndex === 2 ? "Tabs-content content-active" : "content-disable"
          }
        >
          {movies.filter((movie) => movie.type === "save").length === 0 ? (
            <>
              <img src={empty} alt="empty" />
              <h2>Lista Vacia</h2>
              <p>Agrega alguna pelicula</p>
            </>
          ) : (
            <div className="Tabs-content-movies">
              {movies
                .filter((movie) => movie.type === "save")
                .map((movie) => (
                  <UserMovies key={movie.id} movie={movie} />
                ))}
            </div>
          )}
        </div>
        <div
          className={
            tabIndex === 1 ? "Tabs-content content-active" : "content-disable"
          }
        >
          {movies.filter((movie) => movie.type === "favorite").length === 0 ? (
            <>
              <img src={empty} alt="empty" />
              <h2>Lista Vacia</h2>
              <p>Agrega alguna pelicula</p>
            </>
          ) : (
            <div className="Tabs-content-movies">
              {movies
                .filter((movie) => movie.type === "favorite")
                .map((movie) => (
                  <UserMovies key={movie.id} movie={movie} />
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
