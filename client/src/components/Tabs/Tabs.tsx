import "./Tabs.scss";
import { useState } from "react";
import empty from "@/assets/noData.svg";
import { useAppSelector } from "@/hooks/redux";
import { UserMovies } from "../UserMovies/UserMovies";

export const Tabs = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const { movies } = useAppSelector((state) => state.user);

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
          Perfil
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
            tabIndex === 1 ? "Tabs-content content-active" : "content-disable"
          }
        >
          <img src={empty} alt="empty" />
          <h2>Cristian</h2>
          <p>Agrega alguna pelicula</p>
        </div>
        <div
          className={
            tabIndex === 2 ? "Tabs-content content-active" : "content-disable"
          }
        >
          {movies.length === 0 ? (
            <>
              <img src={empty} alt="empty" />
              <h2>Lista Vacia</h2>
              <p>Agrega alguna pelicula</p>
            </>
          ) : (
            <div className="Tabs-content-movies">
              {movies.map((movie) => (
                <UserMovies key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
