import React from 'react'

export const ModalDefault = ({texto, children}) => {
    return (
        <div className="flex flex-col justify-center p-2">
            <h1 className="text-center text-xl">{texto}</h1>
            {children}
        </div>
    )
}
