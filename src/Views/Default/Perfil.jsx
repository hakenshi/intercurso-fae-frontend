import {faCamera, faCog, faL, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import logoBranca from "../../assets/logo-unifae-2021-branca.png";
import React, {useEffect, useRef, useState} from 'react'
import {useStateContext} from '../../Contexts/ContextProvider';
import {Container} from '../../Components/Container';
import {Modal} from '../../Components/Modal';
import {Input} from '../../Components/Inputs/Input';
import {TextArea} from '../../Components/Inputs/TextArea';
import {onlyNumbers} from '../../utils/onlyNumbers';
import axiosInstance from '../../helper/axios-instance';
import {useAlert} from '../../Components/hooks/useAlert';
import {AlertErro} from '../../Components/Alerts/AlertErro';
import {ProfileImage} from '../../Components/ProfileImage';
import {PreviewImage} from '../../Components/Image/PreviewImage';
import {ButtonClose} from '../../Components/Buttons/ButtonClose';
import {handleError} from '../../utils/handleError';

export const Perfil = () => {

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
        formData.append("telefone", telefoneRef.current ? onlyNumbers(telefoneRef.current.value) : user.telefone)
        formData.append("bio", bioRef.current ? bioRef.current.value : user.bio)
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

    function handleClose() {
        setEditModal(e => e = false)
        setProfileImage(null)
    }


    return (
        <>
            <Modal.Root isOpen={editModal} hasButton={false}>
                {/* <div className="grid grid-cols- lg:grid-cols-2 gap-4"> */}
                <div className="relative md:flex md:justify-end md:items-center w-full md:h-8">
                    <ButtonClose onClose={handleClose}
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
                        <TextArea ref={bioRef} label={"Bio"} className={"input-modal resize-none"} name={"bio"}
                                  value={user.bio}/>
                        {/* <Input value={user.email} label={"Email"} className={"input-modal"} /> */}
                        {/* <Input label={"Senha"} className={"input-modal"} /> */}
                        <Input ref={telefoneRef} mask={"(99) 99999-9999"} value={user.telefone} label={"Telefone"}
                               name={"telefone"} className={"input-modal"} placholder={"Insira seu telefone"}/>
                        <Input ref={dataNascimentoRef} value={user.data_de_nascimento} label={"Data de nascimento"}
                               name={"data_de_nascimento"} className={"input-modal"}
                               placholder={"Insira uma data de nascimento"} mask={"99/99/9999"}/>
                        {/* <Input value={user.ra} label={"RA"} className={"input-modal"} /> */}
                        {/* <Input label={"Confirmar Senha"} className={"input-modal"} /> */}

                    </div>
                    {/* </div> */}
                </Modal.Form>
            </Modal.Root>

            {isAlertOpen && (
                <AlertErro mensagem={errors.msg} onClose={() => setIsAlertOpen(false)} isAlertOpen={isAlertOpen}/>)}

            <Container>
                <div
                    className="flex flex-col p-5 bg-gradient-to-tr from-unifae-green-3 via-unifae-green-2 to-unifae-green-4 w-full md:w-[80vw] h-fit md:rounded-t-lg">
                    <div className="flex w-full justify-end gap-5">
                        <div className="flex gap-5 justify-start items-start">
                            <button className='cursor-pointer' onClick={() => setEditModal(e => e = true)}>
                                <FontAwesomeIcon className='text-white text-xl' icon={faPencilAlt}/></button>
                            <button className='cursor-pointer'><FontAwesomeIcon className='text-white text-xl'
                                                                                icon={faCog}/></button>
                        </div>
                    </div>
                    <div className="flex justify-between gap-10 h-full w-full">
                        <div className='flex justify-center items-center gap-10'>
                            <ProfileImage
                                className={"rounded-full lg:w-56 lg:h-56 w-32 h-32 border-collapse border-4 border-unifae-green-4 shadow-xl object-cover"}
                                fotoPerfil={user.foto_perfil}/>
                            <div className='text-unifae-white-1 font-medium text-2xl md:text-3xl'>
                                <p>{user.nome}</p>
                                <i className='text-lg'>{user.tipo_usuario == 1 ? "Admin" : user.tipo_usuario == 2 ? "Responsável" : "Usuário"}</i>
                            </div>
                        </div>
                        <div className="lg:flex lg:flex-col justify-center items-center text-white font-medium hidden">
                            <img className='w-72' src={logoBranca} alt="unifae-logo"/> Intercurso
                        </div>
                    </div>

                </div>
                <div className='flex justify-between flex-col md:flex-row p-10 items-center'>
                    <h2>Termos</h2>
                </div>
            </Container>
        </>
    )
}
