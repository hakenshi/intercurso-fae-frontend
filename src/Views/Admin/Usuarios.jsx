import {useEffect, useRef, useState} from "react"
import {useStateContext} from "../../Contexts/ContextProvider"
import {useNavigate} from "react-router-dom"
import {useAlert} from "../../Components/hooks/useAlert"
import axiosInstance from "../../helper/axios-instance"
import {Oval} from "react-loader-spinner"
import cursos from "../../../public/cursos.json"
import usePagiante from "../../Components/hooks/usePaginate"
import {Paginate} from "../../Components/Paginate"
import {ProfileImage} from "../../Components/ProfileImage"
import {useSearch} from "../../Components/hooks/useSearch"
import Alerts from "../../Components/Alerts"
import {AlertErro} from "../../Components/Alerts/AlertErro"
import {AlertSucesso} from "../../Components/Alerts/AlertSucesso"
import {AlertConfirm} from "../../Components/Alerts/AlertConfirm"
import {faL} from "@fortawesome/free-solid-svg-icons"
import {Modal} from "../../Components/Modal"
import {Table} from "../../Components/Table"
import {Display} from "../../Components/Display"

export const Usuarios = () => {

    const {
        isAlertOpen, setIsAlertOpen, mensagem, setMensagem,
        isConfirmAlertOpen, isErrorAlertOpen, setIsConfirmAlertOpen, setIsErrorAlertOpen
    } = useAlert()
    const {handleSearch, input, results} = useSearch("", "/search-usuarios")
    const {data: usuarios, loading, handlePageChange, currentPage, lastPage, fetchData} = usePagiante("/search-usuarios")

    const nomeRef = useRef(null);
    const emailRef = useRef(null);
    const senhaRef = useRef(null);
    const raRef = useRef(null);
    const cursoRef = useRef(null);
    const confirmSenhaRef = useRef(null);
    const telefoneRef = useRef(null);
    const tipoUsuarioRef = useRef(null)

    const [isEditModal, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUsuario, setEditUsuario] = useState(null)
    const [erros, setErrors] = useState(null);
    const [id, setId] = useState("")

    const handleEditModal = (usuario) => {
        setIsEditModalOpen(true)
        setEditUsuario(usuario)
    }

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false)
        setEditUsuario(null)
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (senhaRef.current.value != confirmSenhaRef.current.value) {
            setMensagem("As senhas não coincidem")
            setIsErrorAlertOpen(true)
            return
        }

        const payload = {
            id_curso: cursoRef.current.value,
            nome: nomeRef.current.value,
            email: emailRef.current.value,
            senha: senhaRef.current.value,
            telefone: telefoneRef.current.value,
            ra: raRef.current.value,
            tipo_usuario: tipoUsuarioRef.current.value ? tipoUsuarioRef.current.value : 3,
        }
        
        if (isEditModal) {
            
            axiosInstance.patch(`/usuarios/${editUsuario.usuario.id}`, payload)
                .then(({data}) => {
                    if (data) {
                        setMensagem("Usuário Editado com sucesso!")
                        fetchData()
                    }

                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        setErrors(response.data.msg)
                    }
                })
                .finally(() => {
                    setIsEditModalOpen(false)
                    setIsAlertOpen(true)
                })
        } else {
            axiosInstance.post('/usuarios', payload)
                .then(({data}) => {
                    if (data) {
                        setMensagem("Usuário cadastrado com sucesso!")
                        fetchData()
                    }
                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        setErrors(response.data.msg)
                    }
                })
                .finally(() => {
                    setIsModalOpen(false)
                    setIsAlertOpen(true)
                })
        }
    }

    const handleDelete = (id) => {
        axiosInstance.delete(`/usuarios/${id}`)
            .then(() => {
                setIsConfirmAlertOpen(false)
                setMensagem("Usuário excluido com sucesso")
                fetchData()
                setIsAlertOpen(true)
            })
            .catch(error => {
                const response = error.response
                if (response) {
                    setErrors(response.data.msg)
                }
            })
    }


    const handleTornarResponsavel = ({usuario}) => {

        if (usuario.tipo_usuario === "2") {
            setMensagem('Esse usuário já é um responsável.')
            setIsErrorAlertOpen(true)
            return
        } else if (usuario.tipo_usuario === "1") {
            setMensagem("Esse usuário é um admin")
            setIsErrorAlertOpen(true)
            return
        }
        const confirm = window.confirm("Tem certeza de que deseja tornar esse usuário responsável?")

        const payload = {
            tipo_usuario: 2
        }

        if (confirm) {
            axiosInstance.patch(`/tornar-responsavel/${usuario.id}`, payload)
                .then(({data}) => {

                    setMensagem("Esse usuário agora é responsável.")
                    setIsAlertOpen(true)
                    setData(u => u.map((usuario) => usuario.usuario.id === data.data.usuario.id ? {
                            ...usuario,
                            usuario: {
                                ...usuario.usuario,
                                tipo_usuario: "2"
                            }
                        } : usuario
                    ))
                })
                .catch(error => {
                    const response = error.response
                    if (response) {
                        setErrors(response)
                    }
                })
        }
    }


    const handleConfirm = (id, mensagem) => {
        setId(id)
        setMensagem(mensagem)
        setIsConfirmAlertOpen(true)
    }

    return (
        <>
            <AlertErro mensagem={mensagem} isAlertOpen={isErrorAlertOpen} onClose={() => setIsErrorAlertOpen(false)}/>
            <AlertConfirm text={mensagem} isOpen={isConfirmAlertOpen} onConfirm={() => handleDelete(id)}
                          onClose={() => setIsConfirmAlertOpen(false)}/>
            <AlertSucesso mensagem={mensagem} isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}/>

            <Modal.Root isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Form onSubmit={handleSubmit} texto="Cadastrar Usuário">
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Nome</label>
                        <input ref={nomeRef} type="text" className="input-modal" name="nome"/>
                    </div>

                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="email">Email</label>
                        <input ref={emailRef} type="text" className="input-modal" name="email"/>
                    </div>

                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="senha">Senha</label>
                        <input ref={senhaRef} type="password" className="input-modal" name="senha"/>
                    </div>

                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="confirmar-senha">Confirmar Senha</label>
                        <input ref={confirmSenhaRef} type="password" className="input-modal" name="confirmar-senha"/>
                    </div>

                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="telefone">Telefone</label>
                        <input ref={telefoneRef} type="text" className="input-modal" name="telefone"/>
                    </div>

                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="ra">RA</label>
                        <input ref={raRef} type="text" className="input-modal" name="ra"/>
                    </div>

                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="curso">Curso</label>
                        <select className={`input-modal bg-white w-[300px]`} name="curso" id="curso">
                            {cursos.map((curso, index) => <option ref={cursoRef} key={index}
                                                                  value={curso.value}>{curso.curso}</option>)}
                        </select>
                    </div>
                </Modal.Form>
            </Modal.Root>

            <Modal.Root isOpen={isEditModal} onClose={handleCloseEditModal}>
                <Modal.Form onSubmit={handleSubmit} texto="Editar Usuário">

                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="nome">Nome</label>
                        <input ref={nomeRef} defaultValue={editUsuario ? editUsuario.usuario.nome : ""} type="text"
                               className="input-modal" name="nome"/>
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="quantidade-pariticpantes">Email</label>
                        <input ref={emailRef} defaultValue={editUsuario ? editUsuario.usuario.email : ""} type="text"
                               className="input-modal" name="quantidade-pariticpantes"/>
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="quantidade-pariticpantes">Senha</label>
                        <input ref={senhaRef} type="password" className="input-modal" name="quantidade-pariticpantes"/>
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="quantidade-pariticpantes">Confirmar Senha</label>
                        <input ref={confirmSenhaRef} type="password" className="input-modal"
                               name="quantidade-pariticpantes"/>
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="quantidade-pariticpantes">Telefone</label>
                        <input ref={telefoneRef} defaultValue={editUsuario ? editUsuario.usuario.telefone : ""}
                               type="text" className="input-modal" name="quantidade-pariticpantes"/>
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="quantidade-pariticpantes">RA</label>
                        <input ref={raRef} defaultValue={editUsuario ? editUsuario.usuario.ra : ""} type="text"
                               className="input-modal" name="quantidade-pariticpantes"/>
                    </div>

                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="quantidade-pariticpantes">Curso</label>
                        <select ref={cursoRef} className={`input-modal bg-white w-[300px]`} name="curso" id="curso">
                            {cursos.map((curso, index) => <option
                                selected={editUsuario ? editUsuario.curso.nome_curso == curso.curso : ""} key={index}
                                value={curso.value}>{curso.curso}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col justify-center p-2">
                        <label htmlFor="quantidade-pariticpantes">Tipo de usuário</label>
                        <select ref={tipoUsuarioRef} defaultValue={editUsuario ? editUsuario.usuario.tipo_usuario : ""}
                                className={`input-modal bg-white w-[300px]`} name="curso" id="curso">
                            <option value="">Escolha um tipo de usuário</option>
                            <option value="3">Usuário</option>
                            <option value="2">Responsável</option>
                            <option value="1">Admin</option>
                        </select>
                    </div>
                </Modal.Form>
            </Modal.Root>

            <Display.Root title={"Usuários"}>
                <Display.ActionsRoot>
                    <Display.ActionsModal setIsModalOpen={() => setIsModalOpen(true)} text={"Cadastrar Usuários"}/>
                    <Display.ActionsSearch handleSearch={handleSearch}/>
                </Display.ActionsRoot>
                <Display.Main>
                    {loading ? (
                            <div className="w-full h-full flex justify-center items-center"><Oval visible={true} height="50"
                                                                                                  width="50" color="#3BBFA7"
                                                                                                  secondaryColor="#38A69B"/>
                            </div>) :
                        (<Table.Root>
                            <Table.Head className="bg-unifae-green-4 rounded-xl text-white w-full"
                                        titles={['Nome', 'Email', 'Curso', 'Telefone', 'Ra', 'Tipo de de usuário', '', '', '',]}/>
                            <Table.Body>
                                {(input.trim() !== "" ? results : usuarios).map((response) => (
                                    <tr key={response.usuario.id} className="text-center">
                                        <td className="p-5 text-pretty">
                                            <ProfileImage className={"w-10 h-10 rounded-full object-cover"}
                                                          fotoPerfil={response.usuario.foto_perfil}/>

                                        </td>

                                        {/* className="w-10 rounded-full object-cover" */}

                                        <td className="p-5 text-pretty">{response.usuario.nome}</td>
                                        <td className="p-5 text-pretty">{response.usuario.email}</td>
                                        <td className="p-5 text-pretty">{response.curso.nome_curso}</td>
                                        <td className="p-5 text-pretty">{!response.usuario.telefone ? "Sem Telefone" : response.usuario.telefone}</td>
                                        <td className="p-5 text-pretty">{response.usuario.ra}</td>
                                        <td className="p-5 text-pretty">{(response.usuario.tipo_usuario == 1) ? "Admin" : (response.usuario.tipo_usuario == 2) ? "Responsável" : "Usuário"}</td>
                                        <td className="p-5 text-pretty">
                                            <button onClick={() => handleTornarResponsavel(response)}
                                                    className="bg-unifae-green-2 p-2 text-white rounded-lg text-sm ">Tornar
                                                Responsável
                                            </button>
                                        </td>
                                        <td className="p-5 flex gap-3">
                                            <button onClick={() => handleEditModal(response)}
                                                    className="btn-sm btn-edit">Editar
                                            </button>
                                            <button
                                                onClick={() => handleConfirm(response.usuario.id, "Tem certeza de que quer excluir esse usuário?")}
                                                className="btn-sm btn-delete">Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </Table.Body>
                        </Table.Root>)}
                </Display.Main>
                <Paginate currentPage={currentPage} handlePageChange={handlePageChange} lastPage={lastPage}/>
            </Display.Root>

        </>


    )
}