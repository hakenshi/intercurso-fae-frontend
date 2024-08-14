import React from 'react'
import {CardTime} from './CardTime'

export const CardTimePlacar = ({times, modalidade, placar}) => {

    return (
        <div className="flex justify-center text-white p-4">
            <div
                className='flex flex-col justify-between items-center bg-gradient-to-tr from-unifae-green-1 to-unifae-green-3 rounded-lg w-full p-4'>
                <div className='font-semibold text-2xl mb-5'>
                    <h3>{modalidade.nome}</h3>
                    <p className='text-base'>{modalidade.genero === "0" ? "Masculino" : "Feminino"}</p>
                </div>
                <div className='flex w-full justify-between items-center'>
                    <CardTime img={times.time1.image} nome={times.time1.nome}/>
                    <div className='flex gap-2 items-center'>
                        <strong className='text-xl'>{placar.placar_time_1}</strong>
                        <p className='text-sm'>X</p>
                        <strong className='text-xl'>{placar.placar_time_2}</strong>
                    </div>
                    <CardTime img={times.time2.image} nome={times.time2.nome}/>
                </div>
            </div>
        </div>
    )
}
