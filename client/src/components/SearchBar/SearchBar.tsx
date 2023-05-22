import "./SearhBar.scss";
import { FiSearch } from "react-icons/fi";

export const SearchBar = () => (
  <form className="Search">
    <input
      type={"text"}
      className="Search-input"
      placeholder="Buscar películas"
    />
    <button className="Search-button" type={"button"}>
      <FiSearch className="Search-button-icon" size={24} />
    </button>
  </form>
);

export default SearchBar;
