import React, { createContext, useState } from 'react'
import { useStateContext } from '../Contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { useClickOutSide } from './hooks/useClickOutside';
import axiosInstance from '../helper/axios-instance';
import { useMediaQuery } from '@react-hook/media-query';
import { Navbar } from './Navbar/Navbar';
import { Aside } from './Aside/Aside';

const AsideContext = createContext();


export default function Layout({links, children}) {

    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isAsideVisible, setIsAsideVisible] = useState(!isMobile);
    const {user, setUser, setSessionToken} = useStateContext()

    const navigate = useNavigate()

    const toggleAsideVisibility = () => {
        setIsAsideVisible(a => !a);
    };

    const asideRef = useClickOutSide(() => {
        if(isMobile && isAsideVisible){
            setIsAsideVisible(false)
        }
    })

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
            <Navbar tipo={"/admin"} foto={user.foto_perfil} id={user.id} isMobile={isMobile} nome={user.nome}
                    onLogout={onLogout} toggleAsideVisibility={toggleAsideVisibility}/>
            <div className="flex">
                <AsideContext.Provider value={{isAsideVisible, toggleAsideVisibility}}>
                    <Aside ref={asideRef} links={links} isAsideVisible={isAsideVisible}/>
                </AsideContext.Provider>
                <div className={`${isAsideVisible ? "flex-grow" : "flex-grow-0"}`}>
                    <main className="flex flex-col justify-center items-center w-screen md:w-full">
                        {children}
                    </main>
                </div>
            </div>
        </div>
)
}
