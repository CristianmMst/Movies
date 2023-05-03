import "./UserNavbar.scss";
import { useState } from "react";
import { ImExit } from "react-icons/im";
import userLogo from "@/assets/user.png";
import { useDispatch } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";
import { IoIosArrowDown } from "react-icons/io";
import { clearToken } from "@/redux/slices/userSlice";

export function UserNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { username } = useAppSelector((state) => state.user);

  const onClick = () => {
    setOpen(!open);
  };

  const LogOut = () => {
    dispatch(clearToken());
  };

  return (
    <div className="UserNavbar" onClick={onClick}>
      <div className="UserNavbar-content">
        <img className="UserNavbar-content-logo" src={userLogo} />
        <p className="UserNavbar-content-text">{username}</p>
      </div>
      <button className="UserNavbar-button">
        <IoIosArrowDown color="#ffffff" />
      </button>
      <div
        className={`UserNavbar-modal${open ? " active" : ""}
        `}
      >
        <ul className="UserNavbar-modal-actions">
          <li
            className="UserNavbar-modal-actions-link"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <FaUserAlt />
            <p>Mi perfil</p>
          </li>
          <li className="UserNavbar-modal-actions-link" onClick={LogOut}>
            <ImExit />
            <p>Desconectar</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserNavbar;
