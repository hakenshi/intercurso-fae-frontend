import {useEffect, useState} from "react"
import {useStateContext} from "../../Contexts/ContextProvider"
import {useNavigate} from "react-router-dom"
import {DashboardCard} from "../../Components/DashboardCard"
import axios from "axios"
import axiosInstance from "../../helper/axios-instance"
import useAxios from "../../Components/hooks/useAxios"
import {Oval} from "react-loader-spinner"
import {Search} from "../../Components/Search bar/Search"
import { Table } from "../../Components/Table"

export default function Dashboard() {

    const {user} = useStateContext()
    const navigate = useNavigate()

    const [usuarios, loading, errors] = useAxios({
        axiosInstance: axiosInstance,
        method: "get",
        url: "/usuarios",
    })

    const totalTimes = 10;
    const totalJogos = 25;
    const totalModalidades = 5;
    const totalUsuarios = 100;

    return (
        <div className="p-7">
            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Card de Total de Times */}
                <div className="bg-card-white-1 p-5 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Total de Times</h3>
                    <p className="text-2xl font-bold mt-2">{totalTimes}</p>
                </div>

                {/* Card de Total de Jogos */}
                <div className="bg-card-white-1 p-5 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Total de Jogos</h3>
                    <p className="text-2xl font-bold mt-2">{totalJogos}</p>
                </div>

                {/* Card de Total de Modalidades */}
                <div className="bg-card-white-1 p-5 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Total de Modalidades</h3>
                    <p className="text-2xl font-bold mt-2">{totalModalidades}</p>
                </div>

                {/* Card de Total de Usuários */}
                <div className="bg-card-white-1 p-5 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold">Total de Usuários</h3>
                    <p className="text-2xl font-bold mt-2">{totalUsuarios}</p>
                </div>
            </div>
        </div>
    )

}