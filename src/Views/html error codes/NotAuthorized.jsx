import {Link} from "react-router-dom";
import {useStateContext} from "../../Contexts/ContextProvider";

const roleFinder = (role) => {
    const roles = {
        1: "admin",
        2: "responsavel",
        3: "usuario",
    }

    return roles[role]
}

export default function NotAuthorized() {

    const {user} = useStateContext()

    console.log(user)

    return (
        <div className="w-full z-50 absolute bg-white h-full left-0 top-0 right-0 bottom-0">
            <h1>Eu acho que não era para você estar aqui</h1>
            <p>Error 403</p>
            <button><Link to={`/${roleFinder(user.tipo_usuario)}`}>Clique aqui para retornar</Link></button>
        </div>
    )
}