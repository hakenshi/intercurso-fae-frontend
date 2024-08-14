import React from 'react'

export const DisplayRoot = ({children, title}) => {
    return (
        <div className="w-full flex items-center flex-col">
            <h1 className="text-center p-5 text-3xl font-medium">{title}</h1>
            {children}
        </div>
    )
}
