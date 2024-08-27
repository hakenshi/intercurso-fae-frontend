import {faBell, faClock, faFaceFrown, faUserGroup} from '@fortawesome/free-solid-svg-icons'
import {faBell as faBellRegular} from "@fortawesome/free-regular-svg-icons"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useState} from 'react'
import useNotification from './hooks/useNotification'
import {useAlert} from './hooks/useAlert'
import {useClickOutSide} from './hooks/useClickOutside'
import {AlertConfirm} from "./Alerts/AlertConfirm.jsx";
import {AlertErro} from "./Alerts/AlertErro.jsx";

const notifications = [
    {
        tipo: 1,
        icon: faUserGroup,
        style: "bg-gradient-to-tr from-blue-300 via-blue-700 to-blue-900 w-7 h-7 p-2 rounded-full"
    },
    {
        tipo: 2,
        icon: faClock,
        style: "bg-gradient-to-tr from-emerald-300 via-emerald-700 to-emerald-900 w-7 h-7 p-2 rounded-full"
    },
]

export const Notficacao = ({id}) => {

    const {notificacao, clearNotifications, readNotification} = useNotification(id)
    const {
        isErrorAlertOpen,
        setIsConfirmAlertOpen,
        mensagem,
        setMensagem,
        setIsErrorAlertOpen,
        isConfirmAlertOpen
    } = useAlert()
    const [mostrarNotficacao, setMostrarNotificacao] = useState(false)
    const notificaoRef = useClickOutSide(() => setMostrarNotificacao(false))

    const handleDeleteNotificacao = () => {
        clearNotifications(notificacao)
        setIsConfirmAlertOpen(false)
        setMostrarNotificacao(false)
    }

    const handleMostrarNotificacao = () => {
        setMostrarNotificacao(!mostrarNotficacao)
    }

    const handleOpenAlert = () => {
        {
            if (notificacao.length === 0) {
                setMensagem("Você não tem notificações")
                setIsErrorAlertOpen(true)
                !isErrorAlertOpen ? setMostrarNotificacao(false) : ""
            } else {
                setIsConfirmAlertOpen(true)
            }
        }
    }

    return (
        <>
            <AlertConfirm onConfirm={handleDeleteNotificacao} isOpen={isConfirmAlertOpen}
                          text={"Tem certeza de que deseja apagar suas notificações?"}
                          onClose={() => setIsConfirmAlertOpen(false)}/>
            <AlertErro isAlertOpen={isErrorAlertOpen} onClose={() => setIsErrorAlertOpen(false)} mensagem={mensagem}/>
            <div ref={notificaoRef}>
                <div onClick={handleMostrarNotificacao} className="text-white cursor-pointer flex items-center">
                    {notificacao.length > 0 ? <div
                        className='relative bottom-2 -right-5 bg-red-600 text-center w-4 h-4 text-xs rounded-full'>{notificacao.length}</div> : ""}
                    <FontAwesomeIcon className='text-base' icon={notificacao.length > 0 ? faBell : faBellRegular}/>
                </div>
                {id && <div
                    className={`absolute z-10 top-12 right-0 overflow-hidden transition-all duration-[400ms] ${mostrarNotficacao ? "max-h-full ease-in" : "max-h-0 ease-out"}`}>
                    <div className="flex justify-center p-4">
                        <div className="w-64 bg-zinc-700 text-white p-2 rounded-[7px]">
                            <p className="text-center">Notificações</p>
                            <div className="flex flex-col text-sm max-w-full max-h-96 overflow-y-scroll">
                                {notificacao.length > 0 ? notificacao.map(notificacao => {
                                    const tipoNotificacao = notifications.find(notification => notification.tipo === notificacao.tipo_notificacao)
                                    return (
                                        <div onClick={() => readNotification(notificacao.id)} key={notificacao.id}
                                             className='hover:bg-unifae-gray50-2 p-2 rounded flex justify-center items-center gap-2 my-2'>
                                            <p>
                                                <FontAwesomeIcon icon={tipoNotificacao.icon}
                                                                 className={tipoNotificacao.style}/>
                                            </p>
                                            <p>{notificacao.notificacao}</p>
                                        </div>
                                    )
                                }) : <div
                                    className='hover:bg-unifae-gray50-2 p-2 rounded flex justify-center items-center gap-2 my-2'>
                                    <p>
                                        <FontAwesomeIcon icon={faFaceFrown}
                                                         className='bg-gradient-to-tr from-yellow-300 to-yellow-600 w-7 h-7 p-2 rounded-full'/>
                                    </p><p>Parece que você não tem nenhuma notificação</p>
                                </div>}
                            </div>
                            <button onClick={() => handleOpenAlert()} className="btn btn-green p-2 w-full">Apagar
                                notificações
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}
Notficacao.displayName = "Notificacao"
