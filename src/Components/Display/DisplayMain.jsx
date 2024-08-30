import React from 'react'

export const DisplayMain = ({children}) => {
    return (
        <div className='md:flex md:justify-center container overflow-x-auto'>
            {children}
        </div>
    )
}
