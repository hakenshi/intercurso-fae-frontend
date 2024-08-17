import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useStateContext} from "../Contexts/ContextProvider";


export default function LoginLayout() {

    const {token, user} = useStateContext()

    if (token && user){
        const redirect = user.tipo_usuario === "1" ? "/admin/dashboard" : user.tipo_usuario === "2" ? "/responsavel/jogos" : "/usuario/jogos"
        if (window.location.pathname === "/login" || window.location.pathname === "/cadastro"){
            return <Navigate to={redirect} replace={true} />
        }
    }
    return <Outlet/>
}