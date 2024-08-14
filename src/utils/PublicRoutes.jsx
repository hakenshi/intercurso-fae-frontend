import React, {useEffect} from 'react'
import {useStateContext} from '../Contexts/ContextProvider'
import axiosInstance from '../helper/axios-instance'
import {Outlet} from 'react-router-dom'

export const PublicRoutes = () => {
    return <Outlet/>
}
