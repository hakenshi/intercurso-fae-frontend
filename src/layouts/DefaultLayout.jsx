import {createContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faBars, faL, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import {useMediaQuery} from "@react-hook/media-query";
import {faGamepad, faSignIn, faTrophy, faFlag, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import AsideItem from "../Components/Aside/AsideItem";
import {Link, NavLink, Navigate, Outlet, useNavigate} from "react-router-dom";
import {useStateContext} from "../Contexts/ContextProvider";
import axiosInstance from "../helper/axios-instance";
import {UserInfo} from "../Components/UserInfo";
import {Aside} from "../Components/Aside/Aside";
import {ProfileImage} from "../Components/ProfileImage";
import {Notficacao} from "../Components/Notficacao";
import {useClickOutSide} from "../Components/hooks/useClickOutside";
import {Navbar} from "../Components/Navbar/Navbar";
import Layout from "../Components/Layout";

// Criando o contexto
const AsideContext = createContext();

const userLinks = [

    {
        path: '/usuario/jogos',
        icon: faGamepad,
        text: 'Jogos'
    },
    {
        path: `/usuario/meus-times`,
        icon: faUserGroup,
        text: "Meus Times"
    },
]


export default function DefaultLayout({isMobile}) {
    return (
        <Layout links={userLinks}>
            <Outlet />
        </Layout>
    );
}

