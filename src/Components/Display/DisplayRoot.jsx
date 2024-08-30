import React from 'react'

export const DisplayRoot = ({children, title}) => {
    return (
        <div className="flex items-center flex-col w-full max-w-[90vw]">
            <h1 className="text-center p-5 text-3xl font-medium">{title}</h1>
            {children}
        </div>
    )
}
