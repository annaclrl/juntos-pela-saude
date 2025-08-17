import { createBrowserRouter } from "react-router-dom";
import PaginaInicial from "../pages/PaginaInicial";
import App from "../App";
import Integrantes from "../pages/Integrantes";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PaginaInicial />
      },
      {
        path: "/integrantes",
        element: <Integrantes />
      },
    ]
  }
]);