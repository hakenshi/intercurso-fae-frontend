import React from 'react';

export const Paginate = ({ currentPage, handlePageChange, lastPage }) => {
    const disabledPrev = currentPage <= 1;
    const disabledNext = currentPage >= lastPage;
    const pageLimit = 5;

    const generatePages = () => {
        let pages = [];
        if (lastPage <= pageLimit + 2) {
            // Caso todas as páginas caibam dentro do limite
            pages = Array.from({ length: lastPage }, (_, i) => i + 1);
        } else {
            // Lógica para renderizar páginas com reticências
            if (currentPage <= pageLimit) {
                // Mostrar primeiras 5 páginas e a última
                pages = [...Array.from({ length: pageLimit }, (_, i) => i + 1), '...', lastPage];
            } else if (currentPage >= lastPage - (pageLimit - 1)) {
                // Mostrar a primeira página e as últimas 5
                pages = [1, '...', ...Array.from({ length: pageLimit }, (_, i) => lastPage - pageLimit + 1 + i)];
            } else {
                // Mostrar primeira página, 3 ao redor da página atual, e a última página
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', lastPage];
            }
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center p-2 gap-3">
            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={disabledPrev}
                        className={`${!disabledPrev ? "hover:bg-gray-100 hover:text-unifae-green-1" : ""} border rounded-md w-10 h-10`}>&laquo;</button>
            </div>
            <div className='border rounded-md divide-x'>
                {generatePages().map((page, index) => (
                    <button key={index} onClick={() => typeof page === 'number' && handlePageChange(page)}
                            className={`w-10 h-10 ${page === currentPage ? "text-unifae-green-1" : ""} ${typeof page !== 'number' ? 'cursor-default' : 'hover:bg-gray-100 hover:text-unifae-green-1'}`}
                            disabled={typeof page !== 'number'}>
                        {page}
                    </button>
                ))}
            </div>
            <div>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={disabledNext}
                        className={`${!disabledNext ? "hover:bg-gray-100 hover:text-unifae-green-1" : ""} border rounded-md w-10 h-10`}>&raquo;</button>
            </div>
        </div>
    );
};
