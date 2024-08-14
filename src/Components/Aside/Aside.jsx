import {createContext, useContext} from "react";
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
import {icon, text} from "@fortawesome/fontawesome-svg-core";
import {AiOutlineTeam} from "react-icons/ai";
import {useStateContext} from "../../Contexts/ContextProvider";

export const Aside = ({isAsideVisible, links}) => {

    const {user} = useStateContext()


    return (
        <aside
            className={`absolute md:relative h-[92.4vh] w-[200px] p-3 bg-zinc-700 transform ${isAsideVisible ? "translate-x-0" : "-translate-x-full"
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
}

Aside.propTypes = {
    isAsideVisible: p.bool
}