import { Navigate, RouteObject } from "react-router-dom";
import { App } from "../components/App";
import {
  Correspondencia,
  Domicilios,
  Residentes,
  HomePage,
  Minuta,
  Parqueadero,
  Visitas,
  Casas,
} from "../components/";

export const MainRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Navigate to={"home"} /> },
      { path: "home", element: <HomePage /> },
      { path: "residentes/:house_id", element: <Residentes /> },
      { path: "casas", element: <Casas /> },
      { path: "visitas", element: <Visitas /> },
      { path: "correspondencia", element: <Correspondencia /> },
      { path: "domicilios", element: <Domicilios /> },
      { path: "parqueadero", element: <Parqueadero /> },
      { path: "minuta", element: <Minuta /> },
    ],
  },
];
