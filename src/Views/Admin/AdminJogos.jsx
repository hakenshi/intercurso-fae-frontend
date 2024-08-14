import React, {useEffect, useRef, useState} from 'react'
import {Display} from '../../Components/Display'
import {Table} from '../../Components/Table'
import axiosInstance from '../../helper/axios-instance'
import {Modal} from '../../Components/Modal'
import {Loading} from '../../Components/Loading'
import {Input} from '../../Components/Inputs/Input'
import {Search} from '../../Components/Search bar/Search'
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'
import {handleRequest} from '../../utils/handleRequest'
import usePagiante from '../../Components/hooks/usePaginate'
import {Paginate} from '../../Components/Paginate'
import {useAlert} from '../../Components/hooks/useAlert'
import {AlertConfirm} from '../../Components/Alerts/AlertConfirm'
import {handleError} from '../../utils/handleError'
import {AlertSucesso} from '../../Components/Alerts/AlertSucesso'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import defineStatus from '../../utils/setStatus'

export const AdminJogos = () => {

    const [url, setUrl] = useState('/paginate/jogos/0')

    const {data: jogos, setData, currentPage, lastPage, handlePageChange, loading, fetchData} = usePagiante(url)
    const {setMensagem, mensagem} = useAlert()
    const [modalidades, setModalidades] = useState([])
    const [editPlacar, setEditPlacar] = useState({
        idJogo: null,
        idProximoJogo: null,
        placar: null,
        times: null
    })
    const [editJogos, setEditJogos] = useState({});

    const [carregando, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(null)
    const dataRef = useRef(null)
    const localRef = useRef(null)
    const horaRef = useRef(null)
    const modalidadeRef = useRef(null)
    const filterRef = useRef(null)
    const timeVencedorRef = useRef(null)
    const placarTime1Ref = useRef(null)
    const placarTime2Ref = useRef(null)


    const [time1, setTime1] = useState(null)
    const [time2, setTime2] = useState(null)

    useEffect(() => {
        const fetchModalidades = async () => {
            try {
                const {data} = await axiosInstance.get("/modalidades");
                data ? setModalidades(data.data) : ""

            } catch (error) {
                console.log(error);
            }

        };

        if (modalidades.length == 0){
            fetchModalidades()
        }
    }, [modalidades]);

    const handleEditPlacar = (idJogo, idProximoJogo, placar, times) => {

        setIsOpen(() => 'placar')
        setEditPlacar(() => ({
            idJogo,
            idProximoJogo,
            placar,
            times
        }))
    }

    const handleSubmit = (e, method, id = null) => {
        e.preventDefault()
        const url = id ? `/jogos/${id}` : "/jogos"
        if (time1 === time2) {
            alert("Um time não pode enfrentar a si mesmo")
            return
        }

        const payload = {
            id_time_1: time1,
            id_time_2: time2,
            data_jogo: `${dataRef.current.value} ${horaRef.current.value}`,
            local: localRef.current.value,
            id_modalidade: modalidadeRef.current.value,
            status: "1"
        }
        handleRequest(url, method, payload)
            .then(({data}) => {
                fetchData()
                // setData(j => {
                //     if (method === 'post') {
                //         return [
                //             ...j, {...data.data}
                //         ]
                //     } else if (method === 'patch') {
                //         return j.map(({jogo}) => jogo.id === id ? {...jogo, ...data.data} : jogo)
                //     }
                // })
            })
            .catch(e => console.log(e))
            .finally(() => setIsOpen(null))
    }

    const handleSelectTime1 = (time) => {
        setTime1(time)
    }
    const handleSelectTime2 = (time) => {
        setTime2(time)
    }

    const handleEditJogos = data => {
        setIsOpen('editar')
        setTime1(() => data.times.time1.id)
        setTime2(() => data.times.time2.id)
        setEditJogos(data)
    }

    const handleCloseEditJogos = () => {
        setIsOpen(() => false)
        setTime1(null)
        setTime2(null)
        setEditJogos({})
    }

    const handleConfirm = id => {
        setIsOpen({
            type: 'confirm',
            id: id
        })
        setMensagem('Tem certeza de que você deseja excluir esse jogo?')
    }

    const handleDelete = (id) => {
        handleRequest(`/jogos/${id}`, "delete")
            .then(() => {
                setIsOpen(null)
                fetchData()
                // setData(j => j.filter(({jogo}) => jogo.id !== id))
            })
            .catch(e => {
                handleError(e)
                return
            })
            .finally(() => {
                setIsOpen('success')
                setMensagem('Jogo excluído com sucesso')
            })
    }

    const increasePlcar = (e, time) => {
        e.preventDefault()
        setEditPlacar(p => ({
            ...p,
            placar: {
                ...p.placar,
                [time]: p.placar[time] + 1
            }
        }))
    }

    const decreasePlacar = (e, time) => {
        e.preventDefault()
        if (editPlacar.placar[time] > 0) {
            setEditPlacar(p => ({
                ...p,
                placar: {
                    ...p.placar,
                    [time]: p.placar[time] - 1
                }
            }))
        }
    }

    function handleUpdatePlacar(e, id, id_proximo_jogo) {
        e.preventDefault()
        const payload = {
            id_jogo: parseInt(id),
            id_proximo_jogo: parseInt(id_proximo_jogo),
            placar_time_1: parseInt(placarTime1Ref.current.value),
            placar_time_2: parseInt(placarTime2Ref.current.value),
            id_time_vencedor: parseInt(timeVencedorRef.current.value),
        }
        axiosInstance.patch(`/placar/${id}`, payload)
            .then(response => {
                const {data} = response.data
                const {placar} = data

                fetchData()

                // setData(j => j.map(jogo =>
                //     jogo.jogo.id === id ? {
                //         ...jogo,
                //         placar: {
                //             ...jogo.placar,
                //             placar_time_1: placar.placar_time_1,
                //             placar_time_2: placar.placar_time_2,
                //             time_vencedor: placar.time_vencedor
                //         }
                //     } : jogo
                // ));

            })
            .catch(e => handleError(e))
            .finally(() => {
                setIsOpen(false)
            })
    }

    const handleChangeFilter = () => {
        setUrl(`/paginate/jogos/${filterRef.current.value}`)
    }

    return (
        <>
            {isOpen?.type === 'confirm' && <AlertConfirm isOpen={true} onClose={() => setIsOpen(false)} text={mensagem} onConfirm={() => handleDelete(isOpen.id)}/>}

            {isOpen === 'success' && <AlertSucesso mensagem={mensagem} onClose={() => setIsOpen(null)} isOpen/>}

            {isOpen === 'placar' && (
                <Modal.Root isOpen onClose={() => {
                    setIsOpen(null)
                    setEditPlacar(p => ({
                        ...p,
                        placar: null,
                        times: null
                    }))
                }}>
                    <Modal.Form texto={"Placar"} hasButton={false} onSubmit={e => handleUpdatePlacar(e, editPlacar.idJogo, editPlacar.idProximoJogo)}>
                        <div className='flex flex-col items-center'>
                            <div className='flex justify-around w-full mb-4'>
                                <div className='text-center'>
                                    <h3 className='text-lg mb-1'>{editPlacar.times.time1.nome}</h3>
                                    <button onClick={e => increasePlcar(e, 'placar_time_1')}
                                            className='bg-sky-500 rounded-lg m-2 text-white p-2 w-10 h-10'>
                                        <FontAwesomeIcon icon={faPlus}/></button>
                                    <input ref={placarTime1Ref} className='input-placar' type='number'
                                           value={editPlacar.placar.placar_time_1} readOnly/>
                                    <button onClick={e => decreasePlacar(e, 'placar_time_1')}
                                            className='bg-red-500 rounded-lg m-2 text-white p-2 w-10 h-10'>
                                        <FontAwesomeIcon icon={faMinus}/></button>
                                </div>
                                <div className='flex items-center justify-center text-2xl text-unifae-gray-2/50'>
                                    <p>VS</p></div>
                                <div className='text-center'>
                                    <h3 className='text-lg mb-1'>{editPlacar.times.time2.nome}</h3>
                                    <button onClick={e => increasePlcar(e, 'placar_time_2')}
                                            className='bg-sky-500 rounded-lg m-2 text-white p-2 w-10 h-10'>
                                        <FontAwesomeIcon icon={faPlus}/></button>
                                    <input ref={placarTime2Ref} className='input-placar' type='number'
                                           value={editPlacar.placar.placar_time_2} readOnly/>
                                    <button onClick={e => decreasePlacar(e, 'placar_time_2')}
                                            className='bg-red-500 rounded-lg m-2 text-white p-2 w-10 h-10'>
                                        <FontAwesomeIcon icon={faMinus}/></button>
                                </div>
                            </div>
                            <div className='text-center w-full mb-4'>
                                <label className='block text-lg mb-1'>Vencedor:</label>
                                <select ref={timeVencedorRef} defaultValue={editPlacar.placar.time_vencedor?.id}
                                        className='input-cadastro bg-white' name="vencedor" id="vencedor">
                                    <option value="">Escolha um time vencedor</option>
                                    {Object.values(editPlacar.times).map((time, index) => (
                                        <option key={index} value={time.id}>{time.nome}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <Modal.Button texto='Salvar' type={"submit"}/>
                    </Modal.Form>
                </Modal.Root>
            )}
            {isOpen === 'editar' && (
                <Modal.Root isOpen onClose={handleCloseEditJogos}>
                    <Modal.Form texto={"Editar Jogo"}
                                onSubmit={(e) => handleSubmit(e, "patch", editJogos.jogo.id ?? null)}>
                        <div className="flex flex-col justify-center p-2">
                            <label>Primerio Time</label>
                            <Search handleSelectUser={handleSelectTime1} url={"/search-times"}
                                    placeholder={"Insira o nome do time 1"} data={editJogos.times.time1.nome ?? ""}/>
                        </div>
                        <div className="flex flex-col justify-center p-2">
                            <label>Segundo Time</label>
                            <Search handleSelectUser={handleSelectTime2} url={"/search-times"}
                                    placeholder={"Insira o nome do time 2"} data={editJogos.times.time2.nome ?? ""}/>
                        </div>
                        <Input ref={dataRef} mask={"99/99/9999"} label={"Data do jogo"} name={"data"}
                               className={"input-modal"} placholder={"Insira um data para o jogo"}
                               value={editJogos.jogo.data_jogo ?? ""}/>
                        <Input ref={horaRef} mask={"99:99"} value={editJogos.jogo.hora_jogo ?? ""}
                               label={"Hora do jogo"} name={"hora"} className={"input-modal"}
                               placholder={"Insira uma hora para o jogo"}/>
                        <div className="flex flex-col justify-center p-2">
                            <label htmlFor={"local"}>Local</label>
                            <input defaultValue={editJogos.jogo.local ?? ""} ref={localRef} type="text"
                                   className={"input-modal"} name={"local"} placeholder={"Insira o local do jogo"}/>
                        </div>
                        <div className="flex flex-col justify-center p-2">
                            <label htmlFor="modalidade">Modalidade do jogo</label>
                            <select ref={modalidadeRef} defaultValue={editJogos.modalidade.id ?? ""}
                                    className='input-modal bg-white' name="modalidade" id="modalidade">
                                <option value="">Selecione uma modalidade</option>
                                {modalidades.map(modalidade => (
                                    <option key={modalidade.id} value={modalidade.id}>{modalidade.nome}</option>))}
                            </select>
                        </div>
                    </Modal.Form>
                </Modal.Root>
            )}
            {isOpen === 'cadastro' && (
                <Modal.Root isOpen onClose={() => setIsOpen(null)}>
                    <Modal.Form texto={"Cadastrar Jogo"} onSubmit={(e) => handleSubmit(e, 'post')}>
                        <div className="flex flex-col justify-center p-2">
                            <label>Primerio Time</label>
                            <Search handleSelectUser={handleSelectTime1} url={"/search-times"}
                                    placeholder={"Insira o nome do time 1"}/>
                        </div>
                        <div className="flex flex-col justify-center p-2">
                            <label>Segundo Time</label>
                            <Search handleSelectUser={handleSelectTime2} url={"/search-times"}
                                    placeholder={"Insira o nome do time 2"}/>
                        </div>
                        <Input ref={dataRef} mask={"99/99/9999"} label={"Data do jogo"} name={"data"}
                               className={"input-modal"} placholder={"Insira um data para o jogo"}/>
                        <Input ref={horaRef} mask={"99:99"} label={"Hora do jogo"} name={"hora"}
                               className={"input-modal"} placholder={"Insira uma hora para o jogo"}/>
                        <div className="flex flex-col justify-center p-2">
                            <label htmlFor={"local"}>Local</label>
                            <input ref={localRef} type="text" className={"input-modal"} name={"local"}
                                   placeholder={"Insira o local do jogo"}/>
                        </div>
                        <div className="flex flex-col justify-center p-2">
                            <label htmlFor="modalidade">Modalidade do jogo</label>
                            <select ref={modalidadeRef} className='input-modal bg-white' name="modalidade"
                                    id="modalidade">
                                <option value="">Selecione uma modalidade</option>
                                {modalidades.map(modalidade => (
                                    <option key={modalidade.id} value={modalidade.id}>{modalidade.nome}</option>))}
                            </select>
                        </div>
                    </Modal.Form>
                </Modal.Root>
            )}
            <Display.Root title={"Jogos"}>
                <Display.ActionsRoot>
                    <Display.ActionsModal setIsModalOpen={() => setIsOpen(() => 'cadastro')} text={"Cadastrar Jogo"}>
                    </Display.ActionsModal>
                    <select ref={filterRef} onChange={handleChangeFilter} className="p-2 rounded bg-white border border-unifae-green-1" name="modalidade" id="modalidade">
                        <option value="0">Sem filtro</option>
                        {modalidades.map(modalidade => (
                            <option key={modalidade.id} value={modalidade.id}>{modalidade.nome}</option>
                        ))}
                    </select>
                </Display.ActionsRoot>
                <Display.Main>
                    {loading ? (<Loading/>) : jogos.length > 0 ? (<>
                        <Table.Root>
                            <Table.Head
                                titles={['Fase', 'Time 1', 'Time 2', 'Time Vencedor', 'Local', 'Data do jogo', 'Hora do jogo', 'Modalidade', 'Status', '']}/>
                            <Table.Body>
                                {jogos && jogos.map((response, i) =>
                                    <tr key={i} className='text-center'>
                                        <td className={'p-5'}>{response.jogo.fase.nome}</td>
                                        <td className='p-5'>{response.times.time1.nome} </td>
                                        <td className="p-2">{response.times.time2.nome}</td>
                                        <td className="p-2">{response.placar.time_vencedor.nome}</td>
                                        <td className='p-5'>{response.jogo.local}</td>
                                        <td className='p-5'>{response.jogo.data_jogo}</td>
                                        <td className='p-5'>{response.jogo.hora_jogo}</td>
                                        <td className='p-5'>{response.modalidade.nome}</td>
                                        <td className='p-5'>{defineStatus(response.jogo.status)}</td>
                                        <td className='p-5 flex gap-5'>
                                            <button
                                                onClick={() => handleEditPlacar(response.jogo.id, response.jogo.id_proximo_jogo, response.placar, response.times)}
                                                className='btn-green p-2'>Placar
                                            </button>
                                            <button onClick={() => handleEditJogos(response)}
                                                    className='btn-edit p-2'>Editar
                                            </button>
                                            <button onClick={() => handleConfirm(response.jogo.id)}
                                                    className='btn-delete p-2'>Apagar
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </Table.Body>
                        </Table.Root>
                        <Paginate currentPage={currentPage} handlePageChange={handlePageChange}
                                  lastPage={lastPage}/> </>) : <p>Não já jogos cadastrados no sistema</p>}
                </Display.Main>
            </Display.Root>
        </>
    )
}
