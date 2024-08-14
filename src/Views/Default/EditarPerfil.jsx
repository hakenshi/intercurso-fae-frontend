import React from 'react'
import {Container} from '../../Components/Container'
import {useStateContext} from '../../Contexts/ContextProvider';
import userLogo from "../../assets/blank-profile-picture-973460_640.png";
import logoBranca from "../../assets/logo-unifae-2021-branca.png";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog, faUser} from '@fortawesome/free-solid-svg-icons';

export const EditarPerfil = () => {

    const {user} = useStateContext()

    return (
        <Container>
            <div
                className="flex items-center p-5 bg-gradient-to-tr from-unifae-green-4 via-unifae-green-2 via-60% to-unifae-green-3 w-full h-1/3 rounded-t-lg">
                <div className="flex justify-between gap-10 w-full">
                    <div className='flex justify-center items-center gap-10'>
                        <img className='rounded-full w-52 h-52' src={userLogo} alt={user.nome}/>
                        <span className='text-unifae-white-1 font-medium text-2xl'>
                <p>{user.nome}</p>
                <i className='text-lg'>{user.tipo_usuario == 1 ? "Admin" : user.tipo_usuario == 2 ? "Responsável" : "Usuário"}</i>
              </span>
                    </div>

                    <div className="flex gap-5">
                        <div className="flex flex-col justify-center items-center text-white font-medium"><img
                            className='w-72' src={logoBranca} alt="unifae-logo"/> Intercurso
                        </div>
                        <Link to={"/usuario/meu-perfil"}> <FontAwesomeIcon className='text-white text-xl'
                                                                           icon={faUser}/></Link>
                        <Link to={"/usuario/configuracoes"}><FontAwesomeIcon className='text-white text-xl'
                                                                             icon={faCog}/></Link>
                    </div>
                </div>
            </div>
            <div className="flex">
            </div>

        </Container>
    )
}
