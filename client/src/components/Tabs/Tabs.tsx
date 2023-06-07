import "./Tabs.scss";
import { User } from "@/types";
import userImg from "@/assets/user.svg";
import empty from "@/assets/noData.svg";
import { UserMovies } from "@/components";
import { IoMdClose } from "react-icons/io";
import { BsCheckLg } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { renameUsername } from "@/redux/slices/userSlice";

interface Props {
  user: User;
}

export const Tabs = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [rename, setRename] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>(user.username!);

  const toggleTab = (index: number) => {
    setTabIndex(index);
  };

  const handleUsername = () => {
    setRename(false);
    dispatch(renameUsername(newUsername));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
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
            tabIndex === 1 ? "Tabs-profile content-active" : "content-disable"
          }
        >
          <img className="Tabs-profile-img" src={userImg} alt="empty" />
          <div className="Tabs-profile-content">
            <div className="Tabs-profile-content-username">
              {rename ? (
                <>
                  <input
                    type="text"
                    className="Tabs-profile-content-username-rename"
                    value={newUsername}
                    onChange={(e) => handleChange(e)}
                  />
                  <button
                    type="button"
                    aria-label="rename"
                    onClick={() => handleUsername()}
                  >
                    <BsCheckLg color="#3c64ff" size={30} />
                  </button>
                  <button
                    type="button"
                    aria-label="rename"
                    onClick={() => setRename(false)}
                  >
                    <IoMdClose color="red" size={30} />
                  </button>
                </>
              ) : (
                <>
                  <h2>{user.username}</h2>
                  <button
                    type="button"
                    aria-label="rename"
                    onClick={() => setRename(!rename)}
                  >
                    <AiFillEdit
                      style={{ marginLeft: "0.5rem" }}
                      color="#3c64ff"
                      size={30}
                    />
                  </button>
                </>
              )}
            </div>
            <p className="Tabs-profile-content-email">{user.email}</p>
          </div>
        </div>
        <div
          className={
            tabIndex === 2 ? "Tabs-content content-active" : "content-disable"
          }
        >
          {user.movies.length === 0 ? (
            <>
              <img src={empty} alt="empty" />
              <h2>Lista Vacia</h2>
              <p>Agrega alguna pelicula</p>
            </>
          ) : (
            <div className="Tabs-content-movies">
              {user.movies.map((movie) => (
                <UserMovies key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
