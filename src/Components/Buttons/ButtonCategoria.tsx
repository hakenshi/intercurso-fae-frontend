import {IconDefinition} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {HTMLAttributes} from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: IconDefinition
    text: string
}

export const ButtonCategoria = ({icon, text, ...rest}: ButtonProps) => {
    return (
        <div className='flex flex-col items-center ju'>
            <button {...rest}
                    className='text-white bg-unifae-green-1 md:w-16 md:h-16 text-base md:text-xl p-2 rounded-full border border-collapse border-unifae-green-2'>
                <FontAwesomeIcon icon={icon}/></button>
            <p className='hidden md:block'>{text}</p>
        </div>
    )
}
