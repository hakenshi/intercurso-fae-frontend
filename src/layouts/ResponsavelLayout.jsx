import {createContext, useRef, useState} from "react";
import {faFlag, faGamepad, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {Outlet, useNavigate} from "react-router-dom";
import {useStateContext} from "../Contexts/ContextProvider";
import axiosInstance from "../helper/axios-instance";
import {Aside} from "../Components/Aside/Aside";
import {Navbar} from "../Components/Navbar/Navbar";
import { useClickOutSide } from "../Components/hooks/useClickOutside";
import Layout from "../Components/Layout";

// Criando o contexto
const AsideContext = createContext();

const responsavelLinks = [

    {
        path: '/responsavel/jogos',
        icon: faGamepad,
        text: 'Jogos'
    },
    {
        path: `/responsavel/meus-times`,
        icon: faUserGroup,
        text: "Meu Times"
    },
    {
        path: '/responsavel/times-intercurso',
        icon: faFlag,
        text: 'Times'
    },
]
export default function ResponsavelLayout({isMobile}) {

    return (
        <Layout links={responsavelLinks}>
            <Outlet/>
        </Layout>
    );
}
