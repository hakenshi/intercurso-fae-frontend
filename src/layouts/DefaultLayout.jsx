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
    const [isAsideVisible, setIsAsideVisible] = useState(!isMobile);
    const {user, setUser, setSessionToken} = useStateContext()

    const navigate = useNavigate()

    const toggleAsideVisibility = () => {
        setIsAsideVisible(a => !a);
    };

    // useEffect(() => {
    //     if (sessionStorage.getItem('ACCESS_TOKEN')) {
    //         axiosInstance.get('/user')
    //             .then(({data}) => {
    //                 setUser(data)
    //             })
    //     }
    //
    // }, [navigate, setUser])

    const onLogout = (e) => {
        e.preventDefault()
        axiosInstance.post('/logout')
            .then(() => {
                setUser({})
                setSessionToken(null)
                navigate("/login", {replace: true})
            })
    }
    return (
        <div className="flex flex-col">
            <Navbar tipo={"/usuario"} foto={user.foto_perfil} id={user.id} isMobile={isMobile} nome={user.nome}
                    onLogout={onLogout} toggleAsideVisibility={toggleAsideVisibility}/>
            <div className="flex">
                <AsideContext.Provider value={{isAsideVisible, toggleAsideVisibility}}>
                    <Aside links={userLinks} isAsideVisible={isAsideVisible}/>
                </AsideContext.Provider>
                 <div className={`${isAsideVisible ? "flex-grow" : "flex-grow-0"}`}>
                <main className="flex justify-center w-full">
                    <Outlet/>
                </main>
                 </div>
            </div>
        </div>
    );
}

