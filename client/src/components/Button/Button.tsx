import "./Button.scss";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: string;
  color: "dark" | "white";
}

export const Button = ({ children, color }: ButtonProps) => {
  return (
    <Link to={children === "Entrar" ? "/login" : "/signin"}>
      <button
        className={color === "dark" ? "ButtonDark" : "ButtonWhite"}
        type="button"
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;
