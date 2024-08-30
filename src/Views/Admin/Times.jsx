import React, {useEffect, useRef, useState} from "react"
import {useStateContext} from "../../Contexts/ContextProvider"
import {useAlert} from "../../Components/hooks/useAlert"
import axiosInstance from "../../helper/axios-instance"
import {Search} from "../../Components/Search bar/Search"
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons"
import {images} from "../../assets"
import {ProfileImage} from "../../Components/ProfileImage"
import {Modal} from "../../Components/Modal"
import {Table} from "../../Components/Table"
import {setStatus} from "../../utils/setStatus"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Loading} from "../../Components/Loading"
import usePagiante from "../../Components/hooks/usePaginate.jsx";
import {Paginate} from "../../Components/Paginate.jsx";

export const Times = ({idResponsavel}) => {

    const filterRef = useRef(null)
    const [paginateUrl, setPaginateUrl] = useState(idResponsavel ? `/paginate/times/${idResponsavel}/0` : '/paginate/times/0')
    const {user} = useStateContext()
    const {isAlertOpen, setIsAlertOpen, handleClose} = useAlert()
    const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
    const [isJogadoresAlertOpen, setisJogadoresAlertOpen] = useState(false);
    const nomeRef = useRef(null)
    const modalidadeRef = useRef(null)
    const responsavelRef = useRef(null)

    

    // const [times, setTimes] = useState(null);
    const [timeId, setTimeId] = useState(null);
    const [editTimes, setEditTimes] = useState(null)
    const [modalidades, setModalidades] = useState(null)
    const [jogadores, setJogadores] = useState(null)
    const [editJogadores, setEditJogadores] = useState([])
    const [loading, setLoading] = useState(true);
    const [erros, setErrors] = useState(null);
    const [novoJogador, setNovoJogador] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    
    const {data, handlePageChange,fetchData,lastPage,currentPage} = usePagiante(paginateUrl)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                if (!modalidades && !jogadores) {
                    const { data } = await axiosInstance.get('/modalidades');
                    const response = await axiosInstance.get('/usuarios');
                    setModalidades(data.data);
                    setJogadores(response.data);
                }
            } catch (error) {
                setErrors(error.message);
            }
        };
        fetchData();
        setLoading(false)
    }, [jogadores, modalidades])

    console.log(modalidades)

    const handleEditModal = (time) => {
        setEditTimes(time)
        setIsEditAlertOpen(true)
    }
    const handleCloseEditModal = () => {
        setIsEditAlertOpen(false)
        setEditTimes(null)
    }
    const handleJogadoresModal = (jogadores, id) => {
        setEditJogadores(jogadores)
        setTimeId(id)
        setisJogadoresAlertOpen(true)
    }

    const handleCloseJogadores = () => {
        setisJogadoresAlertOpen(false)
        if (isEditing) setIsEditing(false)
        setEditJogadores(null)
    }

    const handleSelectResponsavel = (id) => {
        responsavelRef.current.value = id
    }

    const handleSelectJogador = (jogador) => {
        setNovoJogador(jogador)
    }

    const handleAddJogador = () => {
        if (!novoJogador) {
            alert("Por favor, escolha um aluno");
            return;
        }

        const aluno = jogadores.find(jogador => jogador.id === novoJogador);

        if (!aluno) {
            alert("Jogador não encontrado.");
            return;
        }


        const jogadorExistente = editJogadores.some(jogador => jogador.id_usuario === novoJogador);

        if (jogadorExistente) {
            alert("Esse aluno já está no time.");
            return;
        }

        const {
            id_modalidade: modalidadeAtualId,
            quantidade_participantes: quantidade
        } = data.find(time => time.time.id === timeId).modalidade;

        const {nome} = modalidades.find(modalidade => modalidade.id === modalidadeAtualId);

        const jogadorComModalidadeDuplicada = data.some(time =>
            time.time.id !== timeId &&
            time.modalidade.id_modalidade === modalidadeAtualId &&
            time.informacoes.jogadores.some(jogador => jogador.id_usuario === novoJogador)
        );

        if (jogadorComModalidadeDuplicada) {
            const timeDuplicado = data.find(time =>
                time.time.id !== timeId &&
                time.modalidade.id_modalidade === modalidadeAtualId &&
                time.informacoes.jogadores.some(jogador => jogador.id_usuario === novoJogador)
            );

            alert(`${aluno.nome} já pertence a um time com a modalidade ${timeDuplicado.modalidade.nome_modalidade}`);
            return;
        }

        if (editJogadores.length >= quantidade) {
            alert(`Quantidade máxima de jogadores na modalidade ${nome} é de ${quantidade}. O time está cheio.`);
            return;
        }

        const updatedJogadores = [...editJogadores, {...aluno, id_usuario: aluno.id, id_time: timeId, status: '0'}];

        if (updatedJogadores.length === 0) {
            alert("O time deve ter ao menos 1 jogador");
            return;
        }

        const payload = updatedJogadores.map(jogador => ({
            id_usuario: jogador.id_usuario,
            id_time: jogador.id_time,
            status: jogador.status
        }));

        axiosInstance.post('/jogadores', payload)
            .then(({data}) => {
                fetchData()
                // setTimes(t => t.map(time => time.time.id === data.data[0].time.id_time ? {
                //     ...time,
                //     informacoes: {
                //         jogadores: [
                //             ...time.informacoes.jogadores,
                //             ...data.data.map(jogador => ({
                //                 id: jogador.id,
                //                 id_usuario: jogador.usuario.id_usuario,
                //                 id_time: jogador.time.id_time,
                //                 nome: jogador.usuario.nome_usuario,
                //                 email: jogador.usuario.email_usuario,
                //                 ra: jogador.usuario.ra_usuario,
                //                 status: jogador.status,
                //             }))
                //         ],
                //         quantidade: time.informacoes.quantidade + data.data.length,
                //     }
                // } : time));
            })
            .catch(error => {
                const response = error.message;
                if (response) alert(response);
            });

        setEditJogadores(updatedJogadores);
    };


    const handleSubmit = e => {
        e.preventDefault()

        const payload = {
            nome: nomeRef.current.value,
            id_modalidade: modalidadeRef.current.value,
            id_responsavel: !responsavelRef.current ? idResponsavel : responsavelRef.current.value,
            status: "1",
        }

        if (isEditAlertOpen) {
            axiosInstance.put(`/times/${editTimes.time.id}`, payload)
                .then(({data}) => {
                    if (data) {
                        alert("Time Editado com sucesso!")
                        fetchData()
                        // setTimes(t => t.map(time => time.time.id === editTimes.time.id ? {...time, ...data.data} : time))
                    }

                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        alert(response)
                    }
                })
                .finally(() => setIsEditAlertOpen(false))
        } else {
            axiosInstance.post('/times', payload)
                .then(({data}) => {
                    if (data) {
                        alert("Time cadastrado com sucesso!")

                        fetchData()

                        // setTimes(m => [...m, data.data])
                    }
                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        console.log(response.data)
                    }
                })
                .finally(() => setIsAlertOpen(false))
        }
    }

    const handleDeleteTime = (id) => {
        const confirm = window.confirm("Tem certeza de que deseja apagar?")

        if (confirm) {
            axiosInstance.delete(`/times/${id}`)
                .then(() => {
                    alert("Time excluido com sucesso")

                    fetchData()

                    // setTimes(t => t.filter(time => time.time.id !== id))
                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        alert(response)
                    }
                })
        }
    }

    const handleDeleteJogador = (id) => {
        const confirm = window.confirm("Tem certeza de que deseja remover este jogador do time?")

        if (confirm) {
            axiosInstance.patch(`/expulsar-jogador/${id}`)
                .then(() => {
                    alert("Jogador excluido com sucesso")
                    setEditJogadores(j => j.filter(item => item.id !== id))

                    fetchData()

                    // setTimes(t => t.map(time => time.informacoes.jogadores.some(jogador => jogador.id === id) ? ({
                    //     ...time,
                    //     informacoes: {
                    //         ...time.informacoes,
                    //         jogadores: time.informacoes.jogadores.filter(jogador => jogador.id !== id),
                    //         quantidade: time.informacoes.quantidade - 1,
                    //     }
                    // }) : time))
                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        console.log(response.data)
                    }
                })
        }

        return
    }
    const handleInativarTime = (times) => {

        const status = times.time.status === "1" ? "0" : "1"

        const confirm = window.confirm(`Tem certeza de que deseja ${times.time.status === '1' ? "inativar" : "ativar"} esse time?`)

        if (confirm) {
            axiosInstance.put(`/times/${times.time.id}`, {
                status: status
            })
                .then(({data}) => {

                    alert(`Time ${times.time.status === '1' ? "inativado" : "ativado"} com sucesso`)

                    fetchData()

                    // setTimes(t => t.map(time => time.time.id === times.time.id ? {...time, ...data.data} : time))

                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        alert(response.data.msg)
                    }
                })
        }
    }

    const handleEnviarConvite = (jogador) => {

        const status = "0"

        axiosInstance.put(`/jogadores/${jogador.id}`, {
            status: status
        })
            .then(() => {
                setEditJogadores(j => j.map(j => j.id === jogador.id ? {...j, status: status} : j))
                fetchData()

            })
            .catch(error => {
                const response = error.response
                if (response) {
                    alert(response.data.message)
                }
            })
    }

    const handleChangeFilter = () => setPaginateUrl(idResponsavel ? `/paginate/times/${idResponsavel}/${filterRef.current.value}` : `/paginate/times/${filterRef.current.value}`)

    return (
        <>
            <Modal.Root isOpen={isAlertOpen} onClose={handleClose}>
                <Modal.Form onSubmit={handleSubmit} texto="Cadastrar Time">
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Nome do time</label>
                        <input ref={nomeRef} type="text" className="input-modal" name="nome"/>
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="quantidade-pariticpantes">Modalidade</label>
                        <select ref={modalidadeRef} className="input-modal bg-white" name="modalidade" id="modalidade">
                            <option value="">Selecione uma modalidade</option>
                            {modalidades != null && modalidades.map(modalidade => (
                                <option key={modalidade.id} value={modalidade.id}>
                                    {modalidade.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    {user.tipo_usuario == 1 && <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Responsável pelo time</label>
                        <Search ref={responsavelRef} placeholder={"Insira o RA do responsável"} url={"/responsaveis"}
                                handleSelectUser={handleSelectResponsavel}
                                data={editTimes ? editTimes.usuario.nome_responsavel : ""}/>
                    </div>}
                </Modal.Form>
            </Modal.Root>

            {/* Modal de edição */}
            <Modal.Root isOpen={isEditAlertOpen} onClose={handleCloseEditModal}>
                <Modal.Form onSubmit={handleSubmit} texto="Editar Time">
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Nome do time</label>
                        <input ref={nomeRef} defaultValue={editTimes ? editTimes.time.nome : ""} type="text"
                               className="input-modal" name="nome"/>
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="quantidade-pariticpantes">Modalidade</label>
                        <select defaultValue={editTimes ? editTimes.modalidade.id_modalidade : ''} ref={modalidadeRef} className="input-modal bg-white" name="modalidade" id="modalidade">
                            <option value="">Selecione uma modalidade</option>
                            {modalidades != null && modalidades.map(modalidade => (
                                <option
                                        key={modalidade.id} value={modalidade.id}>
                                    {modalidade.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    {user.tipo_usuario == 1 && <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Responsável pelo time</label>
                        <Search placeholder={"Insira o RA do responsável"} url={"/responsaveis"}
                                handleSelectUser={handleSelectResponsavel}
                                data={editTimes ? editTimes.usuario.nome_responsavel : ""}/>
                    </div>}
                </Modal.Form>
            </Modal.Root>
            {/* Modal de jogadores */}
            <Modal.Root isOpen={isJogadoresAlertOpen} onClose={handleCloseJogadores}>
                <Modal.Default texto={'Jogadores'}>

                    <div className="py-5">

                        {!isEditing && <div className="flex justify-center pb-3">
                            <button onClick={() => setIsEditing(true)} className="btn-green p-2 w-32">Editar</button>
                        </div>}

                        {isEditing && <div className="flex justify-center items-center p-2 gap-3 w-full">
                            <Search placeholder={"Insira o RA de um aluno"} url={"/search-jogadores"}
                                    handleSelectUser={handleSelectJogador}/>
                            <button type="button" onClick={handleAddJogador} className="btn-green p-2">Adicionar
                                jogador
                            </button>
                        </div>

                        }

                        {editJogadores && editJogadores.length > 0 ? (
                            <table className="w-full table-auto divide-y divide-gray-200">
                                <thead className="bg-unifae-green-4">
                                <tr className="text-center">
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Nome
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        RA
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {editJogadores.map((jogador, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <ProfileImage className="w-10 h-10 object-cover rounded-full"
                                                          fotoPerfil={jogador.foto_perfil}/>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {jogador.nome}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {jogador.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {jogador.ra}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {setStatus(jogador.status)}
                                        </td>
                                        {isEditing && (
                                            <td className="px-6 py-4 whitespace-nowrap flex gap-6">
                                                {/* <button type="button" onClick={() => handleInativarJogador(jogador)} className={`btn-sm ${jogador.status === "1" ? 'btn-delete' : 'btn-confirm'}`}>
                                                        {setStatus(jogador.status)}
                                                    </button> */}
                                                {jogador.status === "2" &&
                                                    <button onClick={() => handleEnviarConvite(jogador)}
                                                            className="btn-green w-10 h-10 text-xl text-center">
                                                        <FontAwesomeIcon aria-label="enviar novo convite"
                                                                         icon={faArrowsRotate}/></button>}

                                                <button type="button" onClick={() => handleDeleteJogador(jogador.id)}
                                                        className={`btn-sm btn-delete`}>
                                                    Retirar
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            !isEditing && <div className="w-full h-[10vh] flex justify-center items-center">
                                <p>Este time ainda não tem jogadores, clique em editar para adicioná-los!</p>
                            </div>
                        )}
                        {isEditing && (
                            <Modal.Button type="button" texto="Salvar" onClick={() => setIsEditing(false)}/>
                        )}
                    </div>
                </Modal.Default>
            </Modal.Root>

            <div className="w-full flex items-center flex-col">
                <h1 className="text-center p-5 text-2xl font-medium">Times do Intercurso</h1>
                <div className="flex flex-col">
                    <span className="flex justify-around p-3 mb-2">
                        <button onClick={() => setIsAlertOpen(true)} className="w-fit p-2 btn-green text-sm">Cadastrar Time</button>
                    </span>
                    <select ref={filterRef} onChange={handleChangeFilter}
                            className="p-2 rounded bg-white border border-unifae-green-1" name="modalidade"
                            id="modalidade">
                        <option value="0">Escolha uma modalidade...</option>
                        {modalidades && modalidades.map(modalidade => (
                            <option key={modalidade.id} value={modalidade.id}>{modalidade.nome}</option>
                        ))}
                    </select>
                </div>
                {loading ? (<Loading/>) : data && data.length > 0 ?
                    <div className="flex flex-col justify-center items-center p-5">

                        <Table.Root>
                            <Table.Head
                                titles={['Foto', 'Nome', 'Responsável', "Modalidades", 'Quantidade de Jogadores', 'Status', '', '', '']}/>
                            <Table.Body className="divide-y divide-unifae-gray50-2 ">
                                {data && data
                                    .map(response => (
                                        <tr key={response.time.id} className="text-center">
                                            <td className="p-5">{response.time.foto_time == null ?
                                                <img className={"w-10 h-10 rounded-full object-cover"}
                                                     src={images.timeFoto}/> :
                                                <ProfileImage className={"w-10 h-10 rounded-full object-cover"}
                                                              fotoPerfil={response.time_foto}
                                                              alt={response.time.nome}/>}</td>
                                            <td className="p-5 text-sm truncate sm:overflow-ellipsis md:overflow-hidden ">{response.time.nome}</td>
                                            <td className="p-5 text-sm truncate sm:overflow-ellipsis md:overflow-hidden ">{response.usuario.nome_responsavel ? response.usuario.nome_responsavel : "Sem responsável"}</td>
                                            <td className="p-5 text-sm truncate sm:overflow-ellipsis md:overflow-hidden ">{response.modalidade.nome_modalidade}</td>
                                            <td className="p-5 text-sm truncate sm:overflow-ellipsis md:overflow-hidden ">{response.informacoes.quantidade}</td>
                                            <td className="p-5 text-sm truncate sm:overflow-ellipsis md:overflow-hidden ">{response.time.status === "0" ? "Inativo" : "Ativo"}</td>
                                            <td className="p-5 text-sm truncate sm:overflow-ellipsis md:overflow-hidden ">
                                                <button
                                                    onClick={() => handleJogadoresModal(response.informacoes.jogadores, response.time.id)}
                                                    className="bg-unifae-gray-3 text-white p-2 rounded-lg ">Ver
                                                    jogadores
                                                </button>
                                            </td>
                                            <td className="p-5 flex justify-center gap-5">
                                                <button onClick={() => handleEditModal(response)}
                                                        className="p-2 btn-edit">Editar
                                                </button>
                                                <button onClick={() => handleDeleteTime(response.time.id)}
                                                        className={`p-2 btn-delete`}>Excluir
                                                </button>
                                                <button onClick={() => handleInativarTime(response)}
                                                        className={`p-2 ${response.time.status === "0" ? 'btn-confirm' : 'btn-delete'}`}>{`${response.time.status === "0" ? 'Ativar' : 'Inativar'}`}</button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </Table.Body>
                        </Table.Root>
                    </div> : <div className="flex flex-col h-1/2 justify-evenly items-center w-full ">
                        <p className="h-72 flex items-center"> {idResponsavel ? "Você ainda não é responsável por nenhum time" : "Ainda não há times cadastrados no sistema"}</p>
                    </div>}
                <Paginate currentPage={currentPage} handlePageChange={handlePageChange} lastPage={lastPage}/>
            </div>

        </>
    )
}
