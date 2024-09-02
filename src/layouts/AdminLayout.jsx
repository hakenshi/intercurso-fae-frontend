import {faBell, faBars, faL, faUserGroup, faChartLine, faMedal} from "@fortawesome/free-solid-svg-icons";
import {useMediaQuery} from "@react-hook/media-query";
import {faGamepad, faSignIn, faTrophy, faFlag, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {Link, NavLink, Navigate, Outlet, useNavigate} from "react-router-dom";
import {faSoccerBall} from "@fortawesome/free-regular-svg-icons";
import Layout from "../Components/Layout";

const adminLinks = [
    {
        path: '/admin/usuarios',
        icon: faUserGroup,
        text: 'Usuarios',

    },
    {
        path: '/admin/modalidades',
        icon: faMedal,
        text: 'Modalidades',

    },
    {
        path: '/admin/times',
        icon: faFlag,
        text: 'Times',

    },
    {
        path: '/admin/jogos',
        icon: faSoccerBall,
        text: 'Jogos',
    },

]

export default function AdminLayout({isMobile}) {

    return (
        <Layout links={adminLinks}>
            <Outlet/>
        </Layout>
    );
}

