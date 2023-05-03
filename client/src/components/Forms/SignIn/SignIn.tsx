import "./SignIn.scss";
import { useState } from "react";
import { signin } from "@/services";
import { FaUserAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { schemaSignIn, DataSignIn } from "../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

export const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ error: "", success: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataSignIn>({
    mode: "onBlur",
    resolver: yupResolver(schemaSignIn),
  });

  const onSubmit: SubmitHandler<DataSignIn> = async (user) => {
    try {
      setLoading(true);
      const responseSignin = await signin(user);
      setResponse({ error: "", success: responseSignin.success });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setResponse({ success: "", error: error.response.data.error });
      setLoading(false);
    }
  };

  const onChange = () => {
    setResponse({ error: "", success: "" });
  };

  return (
    <div className="Form-container">
      <div className="SignIn">
        <div className="SignIn-title">
          <div className="SignIn-title-icon">
            <FaUserAlt color="#3f4be1" />
          </div>
          <h4 className="SignIn-title-title">Crear Cuenta</h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="SignIn-form">
          <input
            type="text"
            className={`SignIn-form-input ${
              errors.username ? "SignIn-form-error" : ""
            }`}
            placeholder="Usuario"
            {...register("username")}
            onChange={onChange}
          />
          <input
            type="email"
            className={`SignIn-form-input ${
              errors.email ? "SignIn-form-error" : ""
            }`}
            placeholder="Email"
            {...register("email")}
            onChange={onChange}
          />
          <input
            type="password"
            className={`SignIn-form-input ${
              errors.password ? "SignIn-form-error" : ""
            }`}
            placeholder="Contraseña"
            {...register("password")}
            onChange={onChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="SignIn-form-submit"
          >
            {!loading && "Registrar"}
            <ClipLoader size={14} color={"#ffffff"} loading={loading} />
          </button>
        </form>
        <p className="SignIn-form-errorText">
          {errors.email?.message ||
            errors.username?.message ||
            errors.password?.message ||
            response?.error}
        </p>
        {response.success && (
          <p className="SignIn-form-success">{response.success}</p>
        )}
      </div>
    </div>
  );
};
