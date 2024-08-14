import React from 'react'
import {CardTime} from './CardTime'

export const CardTimeDefault = ({times, modalidade, genero}) => {

    return (
        <div className="flex justify-center text-white p-4">

            <div
                className='flex flex-col justify-between items-center bg-gradient-to-tr from-unifae-green-1 to-unifae-green-3 rounded-lg w-full p-4'>
                <div className='font-semibold text-2xl mb-5'>
                    <h3>{modalidade}</h3>
                    <p className='text-base'>{genero === "0" ? "Masculino" : "Feminino"}</p>
                </div>
                <div className='flex w-full justify-between items-center'>
                    <CardTime img={times.time1.image} nome={times.time1.nome}/>
                    <p>X</p>
                    <CardTime img={times.time2.image} nome={times.time2.nome}/>
                </div>
            </div>
        </div>
    )
}
