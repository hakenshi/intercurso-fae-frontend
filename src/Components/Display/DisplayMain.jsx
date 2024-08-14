import React from 'react'

export const DisplayMain = ({children}) => {
    return (
        <div className='flex flex-col justify-center items-center p-5 md:h-11/12'>{children}
        </div>
    )
}
