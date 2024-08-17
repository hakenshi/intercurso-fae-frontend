import axiosInstance from "../../helper/axios-instance.js";
import {useStateContext} from "../../Contexts/ContextProvider.jsx";
import {useNavigate} from "react-router-dom";

export const useLogout = () => {
    const {setUser, setSessionToken} = useStateContext()
    const navigate = useNavigate()


    const logout = e =>{
        e.preventDefault()
        axiosInstance.post('/logout')
            .then(() => {
                setUser({})
                setSessionToken(null)
                navigate("/login", {replace: true})
            })
    }

    return {logout}

}

