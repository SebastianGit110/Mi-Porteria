import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { MainRouter } from "./MainRouter";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <MainRouter />
    </HeroUIProvider>
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="light"
    />
  </StrictMode>
);
