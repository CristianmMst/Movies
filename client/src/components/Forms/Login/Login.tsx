import "./Login.scss";
import { useState } from "react";
import { login } from "@/services";
import { FaUserAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import { schemaLogin, DataLogIn } from "../schema";
import { setToken } from "@/redux/slices/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ error: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataLogIn>({
    mode: "onBlur",
    resolver: yupResolver(schemaLogin),
  });

  const onSubmit: SubmitHandler<DataLogIn> = async (user) => {
    setLoading(true);
    setResponse({ error: "" });
    try {
      const responseLogin = await login(user);
      dispatch(setToken(responseLogin));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setResponse({ error: error.response.data.error });
    }
  };

  return (
    <div className="Form-container">
      <div className="Login">
        <div className="Login-title">
          <div className="Login-title-icon">
            <FaUserAlt color="#3f4be1" />
          </div>
          <h4 className="Login-title-title">Iniciar Sesión</h4>
        </div>
        <form className="Login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            className={`Login-form-input ${
              errors.email ? "Login-form-error" : ""
            }`}
            placeholder="Correo electrónico"
            {...register("email")}
          />
          <input
            type="password"
            className={`Login-form-input ${
              errors.password ? "Login-form-error" : ""
            }`}
            placeholder="Contraseña"
            {...register("password")}
          />
          <button
            type="submit"
            disabled={loading}
            className="Login-form-submit"
          >
            {!loading && "Entrar"}
            <ClipLoader size={14} color={"#ffffff"} loading={loading} />
          </button>
        </form>
        <p className="Login-form-errorText">
          {errors.email?.message || errors.password?.message || response?.error}
        </p>
      </div>
    </div>
  );
};
