import React from 'react'

export const CardRoot = ({children}) => {
    return (
        <div
            className='md:w-96 min-h-96 text-center bg-white rounded-lg shadow-md hover:shadow-lg border border-collapse border-unifae-green-1'>
            {children}
        </div>
    )
}
