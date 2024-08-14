import React from 'react'

export const Paginate = ({currentPage, handlePageChange, lastPage}) => {

    const disabled = currentPage > 1 ? false : true

    return (
        <div className="flex justify-center items-center p-2 gap-3">
            <div>
                {currentPage && (
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={disabled}
                            className={`${disabled ? "" : "hover:bg-gray-100 hover:text-unifae-green-1"} border rounded-md w-10 h-10`}>&laquo;</button>
                )}
            </div>
            <div className='border rounded-md divide-x'>
                {Array.from({length: lastPage}, (_, i) => i + 1).map(page => (
                    <button key={page} onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 hover:bg-gray-100 hover:text-unifae-green-1 ${page === currentPage ? "text-unifae-green-1" : ""}`}>{page}</button>
                ))}
            </div>
            <div>
                {currentPage && (
                    <button onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage < lastPage ? false : true}
                            className={`${currentPage < lastPage ? "hover:bg-gray-100 hover:text-unifae-green-1" : ""} border rounded-md w-10 h-10`}>&raquo;</button>
                )}
            </div>
        </div>
    )
}
