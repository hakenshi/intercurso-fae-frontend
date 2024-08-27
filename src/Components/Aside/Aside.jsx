import {createContext, forwardRef, useContext, useRef, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import AsideItem from "./AsideItem";
import {
    faGamepad,
    faSignIn,
    faTrophy,
    faFlag,
    faUserPlus,
    faUserGroup,
    faChartLine,
    faMedal
} from "@fortawesome/free-solid-svg-icons";
import p from "prop-types"

export const Aside = forwardRef(({isAsideVisible, links}, ref) => {
    
    return (
        <aside ref={ref}
            className={`absolute md:relative w-[200px] p-3 bg-zinc-700 transform ${isAsideVisible ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-500 ease-in-out`}
        >
            <div className="flex flex-col justify-around h-[60%] ">
                <div className="flex flex-col divide-y-2 divide-unifae-gray50-2 space-y-2">
                    {!sessionStorage.getItem('ACCESS_TOKEN') && (<>
                        <Link to="/login">
                            <AsideItem icon={faSignIn} text="Login"/>
                        </Link>
                        <Link to="/cadastro">
                            <AsideItem icon={faUserPlus} text="Cadastro"/>
                        </Link>
                    </>)}
                </div>
                <div className="flex flex-col divide-y-2 divide-unifae-gray50-2 space-y-2">
                    {links.map((userLink, index) => (
                        <NavLink key={index} to={userLink.path}>
                            <AsideItem icon={userLink.icon} text={userLink.text}/>
                        </NavLink>
                    ))}
                </div>
            </div>
        </aside>
    );
})

Aside.propTypes = {
    isAsideVisible: p.bool
}

Aside.displayName = "Aside"