import { createBrowserRouter } from "react-router-dom";
import PaginaInicial from "../pages/PaginaInicial";
import App from "../App";
import Integrantes from "../pages/Integrantes";
import Faq from "../pages/Faq";
import Contato from "../pages/Contato";
import Agenda from "../pages/Agenda";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import DadosConta from "../pages/DadosConta";
import EditarDados from "../pages/EditarDados";
import AgendarConsulta from "../pages/AgendarConsulta";
import Permissao from "../pages/Permissao";
import SalaEspera from "../pages/SalaEspera";

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
      {
        path: "/faq",
        element: <Faq />
      
      },
      {
        path: "/contato",
        element: <Contato />
      },
      {
        path: '/agenda',
        element: <Agenda />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/cadastro',
        element: <Cadastro />
      },
      {
        path: '/dados-conta',
        element: <DadosConta />
      },
      {
        path: '/editar-dados',
        element: <EditarDados />
      },{
        path: '/agendar-consulta',
        element: <AgendarConsulta />
      },
      {
        path: '/permissao',
        element: <Permissao/>
      },
      {
        path: '/sala-espera',
        element: <SalaEspera/>
      }
    ]
  }
]);