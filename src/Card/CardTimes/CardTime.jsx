import React from 'react'

import {images} from '../../assets'

export const CardTime = ({img, nome}) => {

    const foto = img === null || img === "" ? images.timeFoto : img
    const timeNome = nome == null || img === undefined ? "John Doe" : nome
    return (
        <div className='flex flex-col text-center text-white max-w-32'>
            <img className='rounded-full w-32 border-2 border-collapse' src={foto} alt={timeNome}/>
            <p className='capitalize py-2 truncate'>{nome}</p>
        </div>
    )
}
