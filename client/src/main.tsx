import "./index.css";
import { StrictMode } from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
