import {Navigate, createBrowserRouter} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Jogos from "./Views/Default/Jogos";
import Placares from "./Views/Default/Placares";
import VerTimes from "./Views/Default/VerTimes";
import Login from "./Views/Guest/Login";
import Cadastro from "./Views/Guest/Cadastro";
import NotFound from "./Views/html error codes/NotFound";
import GuestLayout from "./layouts/LoginLayout";
import Dashboard from "./Views/Admin/Dashboard";
import {Modalidades} from "./Views/Admin/Modalidades";
import {Times} from "./Views/Admin/Times";
import {Usuarios} from "./Views/Admin/Usuarios";
import {MeusTimes} from "./Views/Responsavel/MeusTimes";
import {Perfil} from "./Views/Default/Perfil";
// import { EditarPerfil } from "./Views/Default/EditarPerfil";
import {Configuracoes} from "./Views/Default/Configuracoes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/jogos"/>,
            },
            {
                path: '/jogos',
                element: <Jogos/>
            },
            {
                path: '/placares',
                element: <Placares/>
            },
            {
                path: '/times-intercurso',
                element: <VerTimes/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/usuarios',
                element: <Usuarios/>,
            },
            {
                path: '/modalidades',
                element: <Modalidades/>,
            },
            {
                path: '/times',
                element: <Times/>,
            },
            {
                path: '/meus-times',
                element: <MeusTimes/>,
            },
            {
                path: '/usuario/meu-perfil',
                element: <Perfil/>
            },
            {
                path: '/usuario/configuracoes',
                element: <Configuracoes/>
            }
        ]
    },

    {
        path: "/",
        element: <GuestLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to={"/login"}/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/cadastro',
                element: <Cadastro/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
])

export default router