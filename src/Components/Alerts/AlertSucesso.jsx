import {faCheck, faClose} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import p from "prop-types"
import {useEffect, useState} from "react"
import {createPortal} from "react-dom"

export const AlertSucesso = ({isOpen, mensagem, onClose}) => {

    if (isOpen)
        return (
            createPortal(<div
                className="flex items-center justify-center min-w-full min-h-full bg-unifae-gray50-1 z-[3] absolute left-0 top-0">
                <div className="h-[600px] flex justify-center items-center">
                    <div className="bg-[#EAEAEA] min-w-[400px] p-5 shadow-md rounded-xl">
                <span className="w-full flex justify-end text-unifae-gray-2"><button onClick={onClose}
                                                                                     className="flex items-center justify-center p-2 h-[30px] w-[30px] rounded-full hover:text-unifae-white-1 hover:bg-unifae-gray50-3">
                    <FontAwesomeIcon icon={faClose}/>
                </button></span>
                        <span
                            className="h-[200px] flex flex-col gap-5 justify-center items-center p-3 text-unifae-gray-2">
                <FontAwesomeIcon fontSize="48" className="w-12 h-12 rounded-full p-2" color="#83CF68" icon={faCheck}/>
                <p className="text-black font-semibold">{mensagem}</p>
                </span>
                        <span className="flex justify-center"><button type="submit" onClick={onClose}
                                                                      className="btn-sm btn-green cklas">Confirmar</button></span>
                    </div>
                </div>
            </div>, document.body)
        )

}

AlertSucesso.propTypes = {
    isOpen: p.bool,
}