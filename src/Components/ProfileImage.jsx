import React from 'react'
import {images} from '../assets'

export const ProfileImage = ({alt, fotoPerfil, className, onClick}) => {

    const imagePath = `${import.meta.env.VITE_API_BASE_URL}/storage/${fotoPerfil}`

    return (
        <img onClick={onClick} className={className} src={fotoPerfil ? imagePath : images.userLogo} alt={alt}/>
    )
}
