import React from 'react'

export function TableHead({titles, checkbox=false}) {
    return (
        <thead className="bg-unifae-green-4 rounded-xl text-white w-full">
        <tr className='text-center'>
            {checkbox && <th className='p-3'><input type='checkbox' /></th>}

            {titles.map((title, key) => <th className='p-3' key={key}>{title}</th>)}
        </tr>
        </thead>
    )
}
