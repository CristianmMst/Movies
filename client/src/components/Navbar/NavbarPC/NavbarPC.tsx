import "./NavbarPC.scss";
import { useState } from "react";
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import { Button, SearchBar, UserNavbar } from "@/components";
import { useAppSelector } from "@/hooks/redux";

interface NavbarProps {
  active?: boolean;
}

export const NavbarPC = ({ active }: NavbarProps) => {
  const [navScroll, setNavScroll] = useState(false);
  const { token } = useAppSelector((state) => state.user);

  const navBarScroll = () => {
    if (window.scrollY >= 80) setNavScroll(true);
    else setNavScroll(false);
  };
  window.addEventListener("scroll", navBarScroll);

  return (
    <nav className={`Navbar${navScroll || active ? " active" : ""}`}>
      <div className="Navbar-left">
        <Link to={"/"}>
          <img className="Navbar-left-logo" src={logo} alt="logo" />
        </Link>
        <div className="Navbar-movies">
          <p className="Navbar-left-link">Películas</p>
          <div className="dropdown-menu">
            <div>
              <Link to="/movies/popular">Populares</Link>
              <Link to="/movies/top_rated">Mejor valoradas</Link>
            </div>
          </div>
        </div>
        <div className="Navbar-series">
          <p className="Navbar-left-link">Series</p>
          <div className="dropdown-menu">
            <div>
              <Link to="/movies/popular">Populares</Link>
              <Link to="/movies/top_rated">Mejor valoradas</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="Navbar-right">
        <SearchBar />
        {token ? (
          <UserNavbar />
        ) : (
          <>
            <Button color="white">Entrar</Button>
            <Button color="dark">Registro</Button>
          </>
        )}
      </div>
    </nav>
  );
};
export default NavbarPC;
