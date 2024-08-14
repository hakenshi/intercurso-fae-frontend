import React from 'react'
import {images} from '../../assets'

export const PreviewImage = ({alt, fotoPerfil, preview, className}) => {

    const imagePath = `${import.meta.env.VITE_API_BASE_URL}/storage/${fotoPerfil}`

    return (
        <img className={className} src={preview ? preview : (fotoPerfil ? imagePath : images.userLogo)} alt={alt}/>
    )
}
