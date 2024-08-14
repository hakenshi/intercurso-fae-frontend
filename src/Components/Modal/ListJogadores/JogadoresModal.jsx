import { useState } from "react";
import { Modal } from "..";
import { ProfileImage } from "../../ProfileImage";

export const JogadoresModal = ({ data, isOpen, handleClose }) => {

    if (isOpen)
        return (
            <Modal.Root isOpen={isOpen} onClose={handleClose}>
                <Modal.Default texto={"Jogadores"}>
                    <div className="py-5 px-4 sm:px-6 lg:px-8">
                        {data && data.length > 0 &&
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-unifae-green-4">
                                    <tr className="text-center">
                                        <th scope="col"
                                            className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        </th>
                                        <th scope="col"
                                            className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Nome
                                        </th>
                                        <th scope="col"
                                            className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col"
                                            className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            RA
                                        </th>
                                        <th scope="col"
                                            className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {data.map((jogador, index) => (
                                        <tr key={index} className="text-sm">
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <ProfileImage className="w-10 h-10 object-cover rounded-full"
                                                              fotoPerfil={jogador.foto_perfil}/>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                {jogador.nome}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                {jogador.email}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                {jogador.ra}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </Modal.Default>
            </Modal.Root>
        );
}
