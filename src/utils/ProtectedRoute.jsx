import {useEffect, useState} from "react";
import {useStateContext} from "../Contexts/ContextProvider"
import axiosInstance from "../helper/axios-instance";
import {Navigate, Outlet} from "react-router-dom";
import {Oval} from "react-loader-spinner";
import {faL} from "@fortawesome/free-solid-svg-icons";

function roleMatch(role) {

    console.log(role)

    const roles = {
        1: "admin",
        2: "responsavel",
        3: "usuario",
    }

    return roles[role]
}

export const ProtectedRoute = ({role}) => {
    const {setUser, token, user} = useStateContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token && !user) {
            console.log('Fetching user data...');
            axiosInstance.get('/user')
                .then(({data}) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(() => {
                    setUser(null);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [token, user, setUser]);

    // if (loading) {
    //     console.log('Loading user data...');
    //     return <div>Loading...</div>;
    // }

    if (!token) {
        return <Navigate to={"/login"} replace/>;
    }

    // if (user && user.tipo_usuario != role) {
    //     return <Navigate to={`/nao-autorizado`} replace />;
    // }

    // console.log('User authorized, rendering route...');
    return <Outlet/>;
};
