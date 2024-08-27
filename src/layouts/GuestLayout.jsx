import {createContext, useEffect, useState} from "react";
import {faGamepad, faTrophy, faFlag, } from "@fortawesome/free-solid-svg-icons";
import {Outlet, useNavigate} from "react-router-dom";
import {useStateContext} from "../Contexts/ContextProvider";
import axiosInstance from "../helper/axios-instance";
import {Aside} from "../Components/Aside/Aside";
import {Navbar} from "../Components/Navbar/Navbar";
import { useClickOutSide } from "../Components/hooks/useClickOutside";

// Criando o contexto
const AsideContext = createContext();

const guestLinks = [

    {
        path: '/',
        icon: faGamepad,
        text: 'Jogos'
    },
    // {
    //     path: '/times-intercurso',
    //     icon: faFlag,
    //     text: 'Times'
    // },
    // {
    //     path: '/placares',
    //     icon: faTrophy,
    //     text: 'Placares'
    // },

]


export default function GuestLayout({isMobile}) {
    const [isAsideVisible, setIsAsideVisible] = useState(!isMobile);
    const {user, setUser, setSessionToken} = useStateContext()

    const navigate = useNavigate()

    const asideRef = useClickOutSide(() => {
        if(isMobile && isAsideVisible){
            setIsAsideVisible(false)
        }
    })
    const toggleAsideVisibility = () => {
        setIsAsideVisible(a => !a);
    };


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
            <Navbar tipo={"/responsavel"} foto={user.foto_perfil} id={user.id} isMobile={isMobile} nome={user.nome}
                    onLogout={onLogout} toggleAsideVisibility={toggleAsideVisibility}/>
            <div className="flex">
                <AsideContext.Provider value={{isAsideVisible, toggleAsideVisibility}}>
                    <Aside ref={asideRef} links={guestLinks} isAsideVisible={isAsideVisible}/>
                </AsideContext.Provider>
                <div className={`${isAsideVisible ? "flex-grow" : "flex-grow-0"} max-h-[92.4vh] overflow-clip`}>
                    <main className="flex justify-center items-center md:w-full w-screen">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div>
    );
}
