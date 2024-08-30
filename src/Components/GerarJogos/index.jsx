import React, {useState} from 'react';
import {useFormStatus} from "react-dom"
import axiosInstance from "../../helper/axios-instance.js";
import {Modal} from "../Modal/index.jsx";
import {generateMatches} from "../../utils/generateMatches.js";
import {Loading} from "../Loading.jsx";
import {faL} from '@fortawesome/free-solid-svg-icons';
import {handleError} from '../../utils/handleError.js';


export const GerarJogos = ({modalidade, nome}) => {

    const [isOpen, setIsOpen] = useState(false)
    const [loading, setIsLoading] = useState(false)


    const handleFetchTimes = async () => {
            setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }
    const handleGenerateMatches = async () => {
        // setIsLoading(true)

        axiosInstance.post("/jogos/gerar-chaves", {
            id_modalidade: modalidade
        })
            .then(({data}) => {
                setIsLoading(false)
                    alert('Partidas geradas com sucesso.')
                    setIsOpen(false)
            })
            .catch(e => {
                setIsLoading(false)
                handleError(e)
            })
    }

    return (
        <>
            <Modal.Root isOpen={isOpen} onClose={() => handleClose()}>
                <Modal.Default>

                    <div className="p-5">
                        Gerar partidas de {nome.toLowerCase()}?
                    </div>

                    <Modal.Button disabled={loading} type={"button"} texto={loading ? <Loading/> : "Gerar Chaves"}
                                  onClick={() => handleGenerateMatches()}/>
                </Modal.Default>
            </Modal.Root>

            <button className="p-2 bg-unifae-green-1 hover:bg-unifae-green-2 text-white rounded truncate" onClick={() => handleFetchTimes()}>Gerar Chaves</button>
        </>
    );
};
