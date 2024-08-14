import React from 'react'

export const ButtonVerJogadores = ({onClick, text = "Ver Jogadores"}) => {
    return (
        <button onClick={onClick} className="bg-unifae-gray-3 text-white p-2 rounded-lg ">{text}</button>
    )
}
