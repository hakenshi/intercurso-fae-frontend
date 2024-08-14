import React from 'react'

export const DisplayModalButton = ({setIsModalOpen, text, children}) => {
    return (
        <span className="flex justify-around p-5">
            {children}
            <button onClick={setIsModalOpen} className="w-fit p-3 btn-green text-sm ">
                {text}
            </button>
        </span>
    )
}
