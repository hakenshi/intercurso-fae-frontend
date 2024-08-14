import React from 'react'

interface ModalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'] | 'button',
    texto: string
}

export const ModalButton = ({type, texto = "Enviar", ...rest}: ModalButtonProps) => {
    return (
        <div className="flex justify-center gap-10 p-2">
            <button type={type} {...rest} className="p-2 bg-unifae-green-1 hover:bg-unifae-green-2 rounded text-white">{texto}</button>
        </div>
    )
}
