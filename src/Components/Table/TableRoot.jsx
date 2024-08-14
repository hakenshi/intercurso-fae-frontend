import React from 'react'

export function TableRoot({children}) {
    return (
        <table className="bg-card-white-1 w-[80vw] flex-grow rounded-xl p-5 ">
            {children}
        </table>
    )
}
