import React from 'react'

export function TableRoot({children}) {
    return (
        <table className="bg-card-white-1 w-[80vw] table-auto rounded-xl p-5 truncate">
            {children}
        </table>
    )
}
