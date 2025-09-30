import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer
        hideProgressBar
        autoClose={2000}
        position="bottom-center"
      />
      <App />
    </BrowserRouter>
  </StrictMode>
);
