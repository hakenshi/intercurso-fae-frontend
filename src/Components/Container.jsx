import React from 'react'

export const Container = ({children}) => {
    return (
        <div className="my-5">
            <div
                className='flex flex-col w-screen md:w-full h-[85vh] bg-card-white-1 rounded-lg shadow-xl shadow-unifae-black-1/20'>
                {children}
            </div>
        </div>
    )
}

