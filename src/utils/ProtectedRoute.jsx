import {useStateContext} from "../Contexts/ContextProvider"
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "../helper/axios-instance.js";
import {handleError} from "./handleError.js";
import {Loading} from "../Components/Loading.jsx";

export const ProtectedRoute = ({role}) => {
    const { token, user, setUser, setSessionToken} = useStateContext();
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (sessionStorage.getItem('ACCESS_TOKEN')) {
            axiosInstance.get('/user')
                .then(({data}) => {
                    setUser(data)
                }).catch(e => {
                    handleError(e)
            }).finally(() =>{
                setIsLoading(false)
            })
        }
    }, [setUser])

    if (isLoading){
        return <Loading/>
    }

    if (token && Object.keys(user).length > 0 && user.tipo_usuario !== role){
        return <Navigate to={"/nao-autorizado"} state={{from: location}} replace={true}/>
    }
    if(!token && Object.keys(user).length <= 0){
        return <Navigate to={"/login"} state={{from: location}} replace={true} />
    }
    return <Outlet />

};
