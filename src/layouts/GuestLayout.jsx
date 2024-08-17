import {createContext, useEffect, useState} from "react";
import {faGamepad, faTrophy, faFlag, } from "@fortawesome/free-solid-svg-icons";
import {Outlet, useNavigate} from "react-router-dom";
import {useStateContext} from "../Contexts/ContextProvider";
import axiosInstance from "../helper/axios-instance";
import {Aside} from "../Components/Aside/Aside";
import {Navbar} from "../Components/Navbar/Navbar";

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
            <Navbar foto={user.foto_perfil} id={user.id} isMobile={isMobile} nome={user.nome} onLogout={onLogout}
                    toggleAsideVisibility={toggleAsideVisibility}/>
            <div className="flex">
                <AsideContext.Provider value={{isAsideVisible, toggleAsideVisibility}}>
                    <Aside links={guestLinks} isAsideVisible={isAsideVisible}/>
                </AsideContext.Provider>
                <div className={`${isAsideVisible ? "flex-grow" : "flex-grow-0"}`}>
                    <main className="flex justify-center items-center md:w-full w-screen">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div>
    );
}
