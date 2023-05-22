import "./SearhBar.scss";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/movies?search=${search}`);
  };

  return (
    <form className="Search" onSubmit={handleSubmit}>
      <input
        type={"text"}
        className="Search-input"
        onChange={handleChange}
        placeholder="Buscar películas"
      />
      <button className="Search-button" type={"submit"}>
        <FiSearch className="Search-button-icon" size={24} />
      </button>
    </form>
  );
};

export default SearchBar;
