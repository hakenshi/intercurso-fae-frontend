import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useStateContext} from "../Contexts/ContextProvider";


export default function LoginLayout() {

    const {token, user} = useStateContext()

    return token ? <Navigate
        to={user.tipo_usuario == 1 ? "/admin/dashboard" : user.tipo_usuario == 2 ? "/responsavel/jogos" : "/usuario/jogos"}
        replace={true}/> : <Outlet/>
}