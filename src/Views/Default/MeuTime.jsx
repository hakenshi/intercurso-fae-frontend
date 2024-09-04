import React, { useEffect, useState } from 'react'
import axiosInstance from '../../helper/axios-instance'
import { useStateContext } from '../../Contexts/ContextProvider';
import { Oval } from 'react-loader-spinner';
import { Table } from '../../Components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRightFromBracket, faUserGroup, faX } from '@fortawesome/free-solid-svg-icons';
import { useAlert } from '../../Components/hooks/useAlert';
import { JogadoresModal } from '../../Components/Modal/ListJogadores/JogadoresModal';
import { ButtonVerJogadores } from '../../Components/Buttons/ButtonVerJogadores';
import { handleError } from '../../utils/handleError';

export const MeuTime = () => {

    const [times, setTimes] = useState([])
    const { user } = useStateContext();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const { isAlertOpen, setIsAlertOpen } = useAlert()
    useEffect(() => {
        if (times.length === 0) {
            axiosInstance.get(`/times/usuario/${user.id}`)
                .then(({ data }) => {                    
                    if (data.data.length > 0)
                        setTimes(data.data)
                    setLoading(false)
                })
                .catch(errors => {
                    handleError(errors)
                    setLoading(false)
                })
        }
    }, [])

    function handleJogadores(jogadores) {        

        setData(jogadores[0])
        
        setIsAlertOpen(true)
    }

    function handleAceitarTime(id, id_time) {

        // alert('Acabou o período de incrições do intercurso, infelizmente, você não pode mais aceitar um time.\nAté o ano que vem :)')

        // return

        const payload = {
            status: "1"
        }

        axiosInstance.patch(`/jogadores/${id}`, payload)
            .then(({ data }) => {
                setTimes(t => t.map(time => time.time.id === id_time ? {
                    ...time,
                    status: data.status
                } : time))
            })
            .catch(error => console.log(error))
    }

    function handleRejeitarTime(id, id_time) {

        // alert('Acabou o período de incrições do intercurso, infelizmente, você não pode mais reijeitar um time.\nAté o ano que vem :)')

        // return

        const payload = {
            status: "2"
        }

        console.log(id);
    
        axiosInstance.patch(`/jogadores/${id}`, payload)
            .then(({ data }) => {
                setTimes(t => t.filter(time => time.time.id !== id_time))
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
            {isAlertOpen && data && <JogadoresModal isOpen={isAlertOpen} data={data} handleClose={() => setIsAlertOpen(false)} />}
            {loading ?
                <div className="w-full h-screen flex justify-center items-center"><Oval visible={true} height="50"
                    width="50" color="#3BBFA7"
                    secondaryColor="#38A69B" />
                </div> : times.length > 0 ? <div className="flex items-center flex-col gap-2 flex-grow m-5 md:m-10">
                    <h1 className='text-center p-5 text-3xl font-medium'>Meus Times</h1>
                    
                  
                    <div className='max-h-[80vh] flex flex-col gap-2 overflow-y-scroll md:w-[1000px]'>
                    <div className='flex justify-between text-center bg-unifae-green-1 text-white p-2 w-full max-w-screen-sm md:max-w-screen-2xl rounded'>
                        <div className='p-2 text-sm md:text-base flex-1 md:p-5'>Nome do time</div>
                        <div className='p-2 text-sm md:text-base flex-1 md:p-5'>Responsavel</div>
                        <div className='p-2 text-sm md:text-base flex-1 md:p-5'>Ações</div>
                    </div>
                    {times
                        .map((time, index) => (
                            <div className='flex justify-between text-center bg-card-white-1 w-full max-w-screen-sm md:max-w-screen-2xl rounded' key={index}>
                            <div className='p-2 text-sm md:text-base flex-1 md:p-5'>{time.time.nome}</div>
                            <div className='p-2 text-sm md:text-base flex-1 md:p-5'>{time.time.responsavel}</div>
                            {/* <div className='p-2 truncate text-sm md:text-base flex-1 md:p-5'>{time.time.modalidade}</div> */}
                            {/* <div className='p-2 truncate text-sm md:text-base flex-1 md:p-5'>{time.time.jogadores[index].length}</div> */}
                            <div className='p-2 md:text-base flex-1 md:p-5'>
                                {time.status === "0" ? (
                                    <div key={time.id} className='flex justify-center gap-4'>
                                        <button onClick={() => handleAceitarTime(time.id, time.time.id)}
                                            className='p-2 h-8 w-8 md:w-10 md:h-10 text-xs md:text-base text-center btn-confirm'>
                                            <FontAwesomeIcon icon={faCheck} /></button>
                                        <button onClick={() => handleRejeitarTime(time.id, time.time.id)}
                                            className='p-2 h-8 w-8 md:w-10 md:h-10 text-xs md:text-base text-center btn-delete'>
                                            <FontAwesomeIcon icon={faX} /></button>
                                    </div>
                                ) : <div className='flex w-full justify-center gap-4' key={time.id}>

                                        <button onClick={() => handleJogadores(time.time.jogadores)} className="p-2 h-8 w-8 md:w-10 md:h-10 text-xs md:text-base text-center text-white bg-zinc-600 rounded">
                                            <FontAwesomeIcon icon={faUserGroup} />
                                        </button>
                                        {/* <button onClick={() => handleSair(time.id, time.time.id)}
                                            className="p-2 h-8 w-8 md:w-10 md:h-10 text-xs md:text-base text-center btn-delete"> <FontAwesomeIcon icon={faRightFromBracket} />
                                        </button> */}
                                    </div>}
                            </div>
                        </div>
                        )
                       
                    )}
                    </div>
                
                </div> : <div className={"w-full h-[65vh] flex justify-center items-center"}><p>Você ainda não faz parte de nenhum time</p></div>}
        </>
    )
}
