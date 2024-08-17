import React from 'react'
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Notficacao} from '../Notficacao';
import {UserInfo} from '../UserInfo';
import {images} from '../../assets';

export const Navbar = ({isMobile, toggleAsideVisibility, id, onLogout, nome, foto, tipo}) => {
    return (
        <header className="bg-unifae-green-1 w-screen shadow-xl">
            <nav className="p-4 flex justify-between">
                <div className="flex items-center gap-3 text-white">
                    {isMobile ? (
                        <button className="block" onClick={toggleAsideVisibility}>
                            <FontAwesomeIcon icon={faBars}/>
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">

                            <a href="https://www.fae.br/unifae2/" target="_blank">
                                <img className="w-[125px]" src={images.logoBranca} alt="unifae-logo"/>
                            </a>
                            <span>Intercurso</span>
                        </div>
                    )}
                </div>
                <div className="flex justify-center items-center gap-7">
                    <Notficacao id={id}/>
                    <UserInfo tipo={tipo} logout={onLogout} nome={nome} foto={foto}/>
                </div>
            </nav>
        </header>
    )
}
