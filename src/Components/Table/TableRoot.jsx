import React from 'react'

export function TableRoot({children}) {
    return (
        <table className="bg-card-white-1 rounded-xl text-[14px]">
            {children}
        </table>
    )
}
