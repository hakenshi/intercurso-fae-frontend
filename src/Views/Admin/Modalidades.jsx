import React, { useEffect, useRef, useState } from "react"
import { useStateContext } from "../../Contexts/ContextProvider"
import { useNavigate } from "react-router-dom"
import { useAlert } from "../../Components/hooks/useAlert"
import axiosInstance from "../../helper/axios-instance"
import { Oval } from "react-loader-spinner"
import { useSearch } from "../../Components/hooks/useSearch"
import usePagiante from "../../Components/hooks/usePaginate"
import { Paginate } from "../../Components/Paginate"
import { Modal } from "../../Components/Modal"
import { handleError } from "../../utils/handleError"
import { capitalize } from "../../utils/capitalize"
import { Loading } from "../../Components/Loading"
import { Table } from "../../Components/Table/index.jsx";
import { GerarJogos } from "../../Components/GerarJogos/index.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Display } from "../../Components/Display/index.jsx"

export const Modalidades = () => {


    const { user } = useStateContext()
    const navigate = useNavigate()
    const { isAlertOpen, setIsAlertOpen, handleClose } = useAlert()
    const { handleSearch, input, results, } = useSearch("", "/search-modalidades")
    const { data: modalidades, loading, handlePageChange, currentPage, lastPage, fetchData } = usePagiante("/paginate/modalidades")

    const nomeRef = useRef(null)
    const quantidadeRef = useRef(null)
    const generoRef = useRef(null)
    const categoriaRef = useRef(null)

    const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
    const [editModalidade, setEditModalidade] = useState(null)
    const [categoria, setCategoria] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [erros, setErrors] = useState(null);
    useEffect(() => {
        axiosInstance.get('/categoria')
            .then(({ data }) => setCategoria(data))
            .catch(e => handleError(e))
    }, [])


    const handleEditModal = (modalidade) => {
        setIsEditAlertOpen(true)
        setEditModalidade(modalidade)
    }

    const handleCloseEditModal = () => {
        setIsEditAlertOpen(false)
        setEditModalidade(null)
    }


    const handleSubmit = e => {
        e.preventDefault()

        const payload = {
            nome: nomeRef.current.value,
            quantidade_participantes: quantidadeRef.current.value,
            genero: generoRef.current.value,
            id_categoria: categoriaRef.current.value
        }

        console.log(payload)

        if (isEditAlertOpen) {
            axiosInstance.put(`/modalidades/${editModalidade.id}`, payload)
                .then(({ data }) => {
                    if (data) {
                        alert("Modalidade Editada com sucesso!")
                        fetchData()
                        // setData(m => m.map(modalidade => modalidade.id === editModalidade.id ? {...modalidade, ...data.data} : modalidade))
                    }

                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        alert(response.data.msg)
                    }
                })
                .finally(() => setIsEditAlertOpen(false))
        } else {
            axiosInstance.post('/modalidades', payload)
                .then(({ data }) => {
                    if (data) {
                        alert("Modalidade cadastrada com sucesso!")
                        fetchData()
                        // setData(m => [...m, data.data])
                    }
                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        alert(response.data.msg)
                    }
                })
                .finally(() => setIsAlertOpen(false))
        }
    }

    const handleDelete = (id) => {
        const confirm = window.confirm("Tem certeza de que deseja apagar?")

        if (confirm) {
            axiosInstance.delete(`/modalidades/${id}`)
                .then(() => {
                    alert("Modalidade excluida com sucesso")
                    fetchData()
                    // setData(m => m.filter(item => item.id !== id))
                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        alert(response.data.msg)
                    }
                })
        }
    }


    return (
        <>
            <Modal.Root isOpen={isAlertOpen} onClose={handleClose}>
                <Modal.Form onSubmit={handleSubmit} texto="Cadastrar Modalidade">
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Nome</label>
                        <input ref={nomeRef} type="text" className="input-modal" name="nome" />
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="quantidade-pariticpantes">Quantidade de participantes</label>
                        <input ref={quantidadeRef} type="text" className="input-modal" name="quantidade-pariticpantes" />
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Gênero da modalidade</label>
                        <select ref={generoRef} className="input-modal bg-white" name="genero" id="genero">
                            <option value="">Selecione um gênero</option>
                            <option value="0">Masculino</option>
                            <option value="1">Feminino</option>
                        </select>

                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Categoria da modalidade</label>
                        <select ref={categoriaRef} className="input-modal bg-white" name="genero" id="genero">
                            <option value="">Selecione uma categoria</option>
                            {categoria.map(categoria => <option value={categoria.id}
                                key={categoria.id}>{capitalize(categoria.nome)}</option>)}
                        </select>
                    </div>
                </Modal.Form>
            </Modal.Root>

            <Modal.Root isOpen={isEditAlertOpen} onClose={handleCloseEditModal}>
                <Modal.Form onSubmit={handleSubmit} texto={"Editar Modalidade"}>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Nome</label>
                        <input ref={nomeRef} type="text" className="input-modal" name="nome"
                            defaultValue={editModalidade ? editModalidade.nome : ""} />
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="quantidade-pariticpantes">Quantidade de participantes</label>
                        <input ref={quantidadeRef}
                            defaultValue={editModalidade ? editModalidade.quantidade_participantes : ""} type="text"
                            className="input-modal" name="quantidade-pariticpantes" />
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Gênero da modalidade</label>
                        <select defaultValue={editModalidade?.genero} ref={generoRef}
                            className="input-modal bg-white" name="genero" id="genero">
                            <option value="">Selecione um gênero</option>
                            <option value="0">Masculino</option>
                            <option value="1">Feminino</option>
                        </select>
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Categoria da modalidade</label>
                        <select defaultValue={editModalidade?.categoria.id} ref={categoriaRef}
                            className="input-modal bg-white" name="genero" id="genero">
                            <option value="">Selecione uma categoria</option>
                            {categoria.map(categoria => <option value={categoria.id}
                                key={categoria.id}>{capitalize(categoria.nome)}</option>)}
                        </select>
                    </div>
                </Modal.Form>
            </Modal.Root>
            <Display.Root title={"Modalidades"}>
                <div className="flex flex-col mb-3">
                    <span className="flex justify-around p-5">
                        <button onClick={() => setIsAlertOpen(true)} className="w-fit p-3 btn-green text-sm ">Cadastrar Modalidade</button>
                    </span>
                    <input type="text" className="input-cadastro" placeholder="Busque uma modalidade..."
                        onChange={handleSearch} />
                </div>

                <Display.Main>
                    {loading ? (<Loading />) :
                        (modalidades.length > 0 ?
                            <Table.Root>
                                <Table.Head titles={['Nome', 'Categoria', 'Participantes', 'Gênero', 'Data de adição', "", ""]} />
                                <Table.Body>
                                    {(input.trim() !== "" ? results : modalidades).map(response => (
                                        <tr key={response.id} className="text-center">
                                            <td className="p-5 truncate">{response.nome}</td>
                                            <td className="p-5 truncate">{capitalize(response.categoria.nome)}</td>
                                            <td className="p-5 truncate">{response.quantidade_participantes}</td>
                                            <td className="p-5 truncate">{response.genero === "0" ? "Masculino" : "Feminino"}</td>
                                            <td className="p-5 truncate">{response.data_adicao}</td>
                                            <td className="p-5 truncate">                                                    
                                                <GerarJogos modalidade={response.id} nome={response.nome} />
                                            </td>
                                            <td className="p-5 flex gap-5">
                                                <button onClick={() => handleEditModal(response)}
                                                    className="btn-sm btn-edit"> <FontAwesomeIcon icon={faPencil} />
                                                </button>
                                                <button onClick={() => handleDelete(response.id)}
                                                    className="btn-sm btn-delete"><FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </Table.Body>
                            </Table.Root>

                            : <p>Ainda não há nenhuma modalidade cadastrada no sistema</p>)}
                </Display.Main>
                {modalidades.length > 0 ?
                    <Paginate currentPage={currentPage} handlePageChange={handlePageChange} lastPage={lastPage} /> : ""}
            </Display.Root>

        </>


    )
}