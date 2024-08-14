import {useEffect, useState} from "react"
import {useStateContext} from "../../Contexts/ContextProvider"
import {useNavigate} from "react-router-dom"
import {DashboardCard} from "../../Components/DashboardCard"
import axios from "axios"
import axiosInstance from "../../helper/axios-instance"
import useAxios from "../../Components/hooks/useAxios"
import {Oval} from "react-loader-spinner"
import {Search} from "../../Components/Search bar/Search"

export default function Dashboard() {

    const {user} = useStateContext()
    const navigate = useNavigate()

    const [usuarios, loading, errors] = useAxios({
        axiosInstance: axiosInstance,
        method: "get",
        url: "/usuarios",
    })

    return (
        <div className="w-[1670px] h-[88vh] p-7 flex flex-col gap-5">
            {/* <div className="bg-card-white-1 rounded-xl ">
                <div className="w-full h-[300px] flex gap-5 justify-around items-center">
                    <DashboardCard>
                        <p className="text-white p-5">Último usuário logado</p>
                    </DashboardCard>
                    <DashboardCard>
                        <p className="text-white p-5">Último usuários cadastrado</p>
                    </DashboardCard>
                </div>
            </div>
            <div className="bg-card-white-1 rounded-xl flex-grow">
                <div className="w-full h-[300px] p-3">
                   {loading ? <div className="w-full h-full flex justify-center items-center"> <Oval visible={true} height="50" width="50" color="#3BBFA7" secondaryColor="#38A69B"/> </div> : <table className="table-fixed w-full border-collapse border-black">
                        <thead>
                            <tr className="bg-unifae-green-4 text-white rounded-md ">
                                <th className="">
                                    ID
                                </th>
                                <th className="">
                                    Nome
                                </th>
                                <th className="">
                                    Curso
                                </th>
                                <th className="">
                                    Email
                                </th>
                                <th className="">
                                    RA
                                </th>
                                <th className="">
                                    Tipo de usuário
                                </th>
                                <th className="">
                                    Data de criação
                                </th>
                            </tr>
                        </thead>

                        <tbody className="text-center">{usuarios.data.data.map(response =>(
                            <tr key={response.usuario.nome}>
                                <td className="border p- border-unifae-gray50-2" >{response.usuario.id}</td>
                                <td className="border p- border-unifae-gray50-2" >{response.usuario.nome}</td>
                                <td className="border p- border-unifae-gray50-2" >{response.curso.nome_curso}</td>
                                <td className="border p- border-unifae-gray50-2" >{response.usuario.email}</td>
                                <td className="border p- border-unifae-gray50-2" >{response.usuario.ra}</td>
                                <td className="border p- border-unifae-gray50-2" >{response.usuario.tipo_usuario}</td>
                                <td className="border p- border-unifae-gray50-2" >{response.usuario.data_criacao}</td>
                            </tr>
                        ))}</tbody>

                    </table>
                        }   
                </div>

            </div> */}
        </div>
    )

}