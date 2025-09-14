import { createBrowserRouter, RouterProvider, createHashRouter } from "react-router-dom";
import { MainRoutes } from "./routes/MainRoutes";

const router = createBrowserRouter(MainRoutes);

export const MainRouter = () => {
  return <RouterProvider router={router} />;
};
