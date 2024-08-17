import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import userLogo from "../assets/blank-profile-picture-973460_640.png";
import {faCamera, faGear, faHeart, faPencilAlt, faSignOut, faUser} from "@fortawesome/free-solid-svg-icons";
import p from "prop-types"
import {Link, NavLink} from "react-router-dom";
import {ProfileImage} from "./ProfileImage";
import React, {forwardRef, useRef, useState} from "react";
import {useClickOutSide} from "./hooks/useClickOutside";
import {createPortal} from "react-dom";
import {Modal} from "./Modal/index.jsx";
import {ButtonClose} from "./Buttons/ButtonClose.jsx";
import {PreviewImage} from "./Image/PreviewImage.jsx";
import {Input} from "./Inputs/Input.jsx";
import {AlertErro} from "./Alerts/AlertErro.jsx";
import {useStateContext} from "../Contexts/ContextProvider.jsx";
import {useAlert} from "./hooks/useAlert.jsx";
import {onlyNumbers} from "../utils/onlyNumbers.js";
import axiosInstance from "../helper/axios-instance.js";
import logoBranca from "../assets/logo-unifae-2021-branca.png";

export const UserInfo = ({nome, logout, foto, tipo}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const perfilRef = useClickOutSide(() => setIsOpen(false))
    const {user, setUser} = useStateContext()
    const {isAlertOpen, setIsAlertOpen} = useAlert()

    const [editModal, setEditModal] = useState(false)
    const [profileImage, setProfileImage] = useState(null)
    const [errors, setErros] = useState("")

    const fileRef = useRef(null)
    const nomeRef = useRef(null)
    const emailRef = useRef(null)
    const senhaRef = useRef(null)
    const bioRef = useRef(null)
    const telefoneRef = useRef(null)
    const raRef = useRef(null)
    const dataNascimentoRef = useRef(null)
    const cursoRef = useRef(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setProfileImage(file ? URL.createObjectURL(file) : null)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append("nome", emailRef.current ? nomeRef.current.value : user.nome)
        formData.append("email", emailRef.current ? emailRef.current.value : user.email)
        formData.append("senha", senhaRef.current ? senhaRef.current.value : "")
        // formData.append("telefone", telefoneRef.current ? onlyNumbers(telefoneRef.current.value) : user.telefone)
        // formData.append("bio", bioRef.current ? bioRef.current.value : user.bio)
        formData.append("ra", raRef.current ? raRef.current.value : user.ra)
        formData.append("id_curso", cursoRef.current ? cursoRef.current.value : user.id_curso)
        formData.append("data_de_nascimento", dataNascimentoRef.current ? onlyNumbers(dataNascimentoRef.current.value) : user.data_de_nascimento)
        formData.append("foto_perfil", fileRef.current.files[0] !== undefined ? fileRef.current.files[0] : "")

        axiosInstance.post(`/usuarios/${user.id}?_method=PUT`, formData)
            .then(({data}) => {
                if (data) {
                    const {curso, usuario} = data.data
                    setUser(u => ({
                        ...u,
                        ...usuario,
                        curso: curso.id_curso
                    }))
                    setProfileImage(null)
                    setEditModal(false)
                }
            })
            .catch(errors => {
                const response = errors.response
                if (response) {
                    setErros(response.data)
                }
            })
    }

    function handleCloseEdit() {
        setEditModal(e => e = false)
        setProfileImage(null)
    }

    return (
        <>

            <Modal.Root isOpen={editModal} hasButton={false}>
                <div className="relative md:flex md:justify-end md:items-center w-full md:h-8">
                    <ButtonClose onClose={handleCloseEdit}
                                 className={"absolute text-unifae-white-1 md:text-unifae-gray-2"}/>
                </div>
                <Modal.Form onSubmit={handleSubmit}>
                    <div
                        className="flex justify-center items-center p-5 bg-gradient-to-tr from-unifae-green-3 via-unifae-green-2 to-unifae-green-4 h-1/3 rounded-t-lg">
                        <div className='flex justify-center items-center flex-col gap-5'>
                            <div className="relative z-0">
                                <PreviewImage
                                    className={"rounded-full md:w-56 md:h-56 w-24 h-24 border-collapse border-4 border-unifae-green-4 shadow-xl object-cover"}
                                    fotoPerfil={user.foto_perfil} preview={profileImage} alt={user.nome}/>

                                <FontAwesomeIcon icon={faCamera}
                                                 className='cursor-pointer absolute bottom-0 right-0 md:bottom-2 md:right-6 bg-unifae-green-4 p-2 rounded-full text-white xl:text-2xl'
                                                 onClick={() => fileRef.current.click()}/>
                                <input className='hidden' hidden type="file" accept='.jpg, jpeg, png' ref={fileRef}
                                       onChange={handleImageChange} name='foto_perfil'/>
                            </div>
                            <div className='text-unifae-white-1 font-medium text-2xl md:text-3xl'>
                                <p>
                                    {user.nome}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col '>
                        <Input ref={nomeRef} value={user.nome} label={"Nome"} name={"nome"} className={"input-modal"}
                               placholder={"Insira seu nome"}/>
                        <Input ref={dataNascimentoRef} value={user.data_de_nascimento} label={"Data de nascimento"}
                               name={"data_de_nascimento"} className={"input-modal"}
                               placholder={"Insira uma data de nascimento"} mask={"99/99/9999"}/>
                        <Input label={"Senha"} className={"input-modal"} />
                        <Input label={"Confirmar Senha"} className={"input-modal"} />
                    </div>
                </Modal.Form>
            </Modal.Root>

            {isAlertOpen && (<AlertErro mensagem={errors.msg} onClose={() => setIsAlertOpen(false)} isAlertOpen={isAlertOpen}/>)}

            <Modal.Root isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
                <Modal.Default>
                    <div
                        className="flex flex-col p-5 bg-gradient-to-tr from-unifae-green-3 via-unifae-green-2 to-unifae-green-4 w-full md:w-[50vw] rounded-lg min-h-96">
                        <div className="flex flex-col justify-between gap-10 h-full w-full">
                            <div className='flex flex-col justify-center items-center text-white gap-2'>
                                <ProfileImage
                                    className={"rounded-full lg:w-52 lg:h-52 w-32 h-32 border-collapse border-4 border-unifae-green-4 shadow-xl object-cover"}
                                    fotoPerfil={user.foto_perfil}/>
                                <div className="p-2"><img className='w-56' src={logoBranca} alt="unifae-logo"/></div>
                                <p className="text-xl">{user.nome}</p>
                                <p className="text-md">{user.email}</p>
                                <p className="text-md">RA: {user.ra}</p>
                                <p className='text-md'>{user.tipo_usuario == 1 ? "Admin" : user.tipo_usuario == 2 ? "Responsável" : "Usuário"}</p>
                                <footer className={"text-white text-center"}>
                                    Desenvolvido com <FontAwesomeIcon icon={faHeart}/> por <a
                                    href="https://labsoft-unifae.com.br" target="_blank">SoftJr</a>
                                </footer>
                            </div>

                        </div>
                    </div>
                </Modal.Default>
            </Modal.Root>

            <div ref={perfilRef} className="relative">
                <ProfileImage onClick={() => setIsOpen(o => !o)}
                              className={"cursor-pointer w-10 h-10 rounded-full object-cover"} fotoPerfil={foto}/>
                {nome && createPortal(<div
                    className={`absolute top-11 right-0 overflow-hidden transition-all duration-[400ms] ${isOpen ? "max-h-96 ease-in" : "max-h-0 ease-out"}`}>
                    <div className="w-full flex justify-center p-4">
                        <div className="user-dropdown">
                    <span className=" flex w-full text-lg items-center gap-5 p-3">
                        <ProfileImage className={"w-10 h-10 rounded-full object-cover"} fotoPerfil={foto}/>
                        {nome.split(' ')[0]} </span>
                            <button onClick={() => setIsProfileOpen(true)} className=" flex w-full text-lg items-center gap-3 p-3 hover:bg-unifae-gray50-2 hover:rounded-md">
                                <FontAwesomeIcon
                                    icon={faUser}/> Perfil
                            </button>
                            <button onClick={() => setEditModal(true)} className=" flex w-full text-lg items-center gap-3 p-3 hover:bg-unifae-gray50-2 hover:rounded-md">
                                <FontAwesomeIcon icon={faGear}/> Configurações
                            </button>
                            {nome && <span onClick={logout}
                                           className="cursor-pointer flex w-full text-lg items-center gap-3 p-3 hover:bg-unifae-gray50-2 hover:rounded-md"> <FontAwesomeIcon
                                icon={faSignOut}/>  Logout </span>}
                        </div>
                    </div>
                </div>, document.body)}
            </div>
        </>

    )
}