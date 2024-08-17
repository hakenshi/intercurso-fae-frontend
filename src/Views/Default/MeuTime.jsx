import React, {useEffect, useState} from 'react'
import axiosInstance from '../../helper/axios-instance'
import {useStateContext} from '../../Contexts/ContextProvider';
import {Oval} from 'react-loader-spinner';
import {Table} from '../../Components/Table';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faRightFromBracket, faUserGroup, faX} from '@fortawesome/free-solid-svg-icons';
import {useAlert} from '../../Components/hooks/useAlert';
import {JogadoresModal} from '../../Components/Modal/ListJogadores/JogadoresModal';
import {ButtonVerJogadores} from '../../Components/Buttons/ButtonVerJogadores';
import {handleError} from '../../utils/handleError';

export const MeuTime = () => {

    const [times, setTimes] = useState([])
    const {user} = useStateContext();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const {isAlertOpen, setIsAlertOpen} = useAlert()

    useEffect(() => {
        if (times.length === 0) {
            axiosInstance.get(`/times/usuario/${user.id}`)
                .then(({data}) => {
                    if (data.data.length > 0)
                        setTimes(data.data)
                    setLoading(false)
                })
                .catch(errors => {
                    handleError(errors)
                    setLoading(false)
                })
        }
    }, [times, user.id])

    function handleJogadores(jogadores) {
        setData(jogadores)
        setIsAlertOpen(true)
    }

    function handleAceitarTime(id) {
        const payload = {
            status: "1"
        }

        axiosInstance.patch(`/jogadores/${id}`, payload)
            .then(({data}) => {
                setTimes(t => t.map(time => time.time.id === data.data.time.id_time ? {
                    ...time,
                    informacoes: {
                        ...time.informacoes,
                        jogadores: time.informacoes.jogadores.map(jogador => jogador.id === id ? {
                            ...jogador,
                            status: data.data.status
                        } : jogador),
                    }
                } : time))
            })
            .catch(error => console.log(error))
    }

    function handleRejeitarTime(id) {
        const payload = {
            status: "2"
        }

        axiosInstance.patch(`/jogadores/${id}`, payload)
            .then(({data}) => {
                setTimes(t => t.filter(time => time.time.id !== data.data.time.id_time))
            })
            .catch(error => console.log(error))
    }

    const handleSair = (id, id_time) => {
        const confirm = window.confirm("Tem certeza que quer sair desse time?")

        if (confirm) {
            axiosInstance.patch(`/expulsar-jogador/${id}`)
                .then(() => {
                    setTimes(t => t.filter(time => time.time.id !== id_time))
                })
        }
    }

    return (
        <>
            <JogadoresModal isOpen={isAlertOpen} data={data} handleClose={() => setIsAlertOpen(false)}/>
            {loading ?
                <div className="w-full h-screen flex justify-center items-center"><Oval visible={true} height="50"
                                                                                        width="50" color="#3BBFA7"
                                                                                        secondaryColor="#38A69B"/>
                </div> : times.length > 0 ? <div className="flex items-center flex-col gap-2 flex-grow m-5 md:m-10">
                    <h1 className='text-cetner p-5 text-3xl font-medium'>Meus Times</h1>

                                {times
                                    .filter(({informacoes}) => informacoes.jogadores[0].status === "0" || informacoes.jogadores[0].status === "1")
                                    .map((time, index) => <div className='flex justify-between text-center bg-card-white-1 w-full max-w-screen-sm md:max-w-screen-2xl rounded p-5' key={index}>
                                        <div className='p-2 text-sm md:text-base flex-1 md:p-5'>{time.time.nome}</div>
                                        <div className='p-2 text-sm md:text-base flex-1 md:p-5'>{time.usuario.nome_responsavel}</div>
                                        <div className='p-2 text-sm md:text-base flex-1 md:p-5'>{time.modalidade.nome_modalidade}</div>
                                        <div className='p-2 text-sm md:text-base flex-1 md:p-5'>{time.informacoes.quantidade}</div>
                                        <div className='p-2 md:text-base flex-1 md:p-5'>{time.informacoes.jogadores.map(({
                                                                                                 status,
                                                                                                 id_time,
                                                                                                 id
                                                                                             }) => status === "0" ? (
                                            <div key={id_time} className='flex justify-center gap-4'>
                                                <button onClick={() => handleAceitarTime(id)}
                                                        className='p-2 h-8 w-8 md:w-10 md:h-10 text-xs md:text-base text-center btn-confirm'>
                                                    <FontAwesomeIcon icon={faCheck}/></button>
                                                <button onClick={() => handleRejeitarTime(id)}
                                                        className='p-2 h-8 w-8 md:w-10 md:h-10 text-xs md:text-base text-center btn-delete'>
                                                    <FontAwesomeIcon icon={faX}/></button>
                                            </div>
                                        ) : <div className='flex w-full justify-center gap-4' key={id_time}>

                                            <button onClick={() => handleJogadores(time.informacoes.jogadores)} className="p-2 h-8 w-8 md:w-10 md:h-10 text-xs md:text-base text-center text-white bg-zinc-600 rounded">
                                                <FontAwesomeIcon icon={faUserGroup} />
                                            </button>

                                            {/*<ButtonVerJogadores text={<FontAwesomeIcon icon={faUserGroup} />} key={index}*/}
                                            {/*                    onClick={() => handleJogadores(time.informacoes.jogadores)}/>*/}
                                            <button onClick={() => handleSair(id, id_time)}
                                                    className="p-2 h-8 w-8 md:w-10 md:h-10 text-xs md:text-base text-center btn-delete"> <FontAwesomeIcon icon={faRightFromBracket} />
                                            </button>
                                        </div>)}
                                        </div>
                                    </div>)}
                </div> :<div className={"w-full h-[65vh] flex justify-center items-center"}><p>Você ainda não faz parte de nenhum time</p></div>}
        </>
    )
}
