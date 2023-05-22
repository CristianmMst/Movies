import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";

type Props = {
  children?: ReactNode;
};

function PrivateRoute({ children }: Props) {
  const { token } = useAppSelector((state) => state.user);
  return <>{token ? children : <Navigate to={"/"} />}</>;
}

export default PrivateRoute;
