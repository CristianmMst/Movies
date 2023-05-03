import "./SearhInput.scss";
import { FiSearch } from "react-icons/fi";

export const SearchInput = () => (
  <div className="Search">
    <input type={"text"} placeholder="Buscar películas" />
    <button type={"button"}>
      <FiSearch className="icon" size={24} />
    </button>
  </div>
);

export default SearchInput;
