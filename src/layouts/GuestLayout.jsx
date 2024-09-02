import {createContext, useEffect, useState} from "react";
import {faGamepad, faTrophy, faFlag, } from "@fortawesome/free-solid-svg-icons";
import {Outlet, useNavigate} from "react-router-dom";
import {useStateContext} from "../Contexts/ContextProvider";
import axiosInstance from "../helper/axios-instance";
import {Aside} from "../Components/Aside/Aside";
import {Navbar} from "../Components/Navbar/Navbar";
import { useClickOutSide } from "../Components/hooks/useClickOutside";
import Layout from "../Components/Layout";

// Criando o contexto
const AsideContext = createContext();

const guestLinks = [

    {
        path: '/',
        icon: faGamepad,
        text: 'Jogos'
    },
]


export default function GuestLayout({isMobile}) {

    return (
        <Layout links={guestLinks}>
            <Outlet />
        </Layout>
    );
}
