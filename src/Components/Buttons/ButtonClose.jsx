import {faClose} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'

export const ButtonClose = ({onClose, className = "flex justify-end text-unifae-gray-2"}) => {
    return (
        <span className={`${className} `}>
            <button onClick={onClose}
                    className="flex items-center justify-center p-2 h-[30px] w-[30px] rounded-full hover:text-unifae-white-1 hover:bg-unifae-gray50-3">
            <FontAwesomeIcon icon={faClose}/>
        </button>
        </span>
    )
}
