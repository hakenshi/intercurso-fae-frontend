import { createElement } from 'react'
import axiosInstance from '../../helper/axios-instance'
import { handleError } from '../../utils/handleError'

export default function ButtonCsv() {

    const exportExcel = () => {
        axiosInstance.get('/jogos/export')
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'jogos.xlsx')
            document.body.appendChild(link)
            link.click()

            window.URL.revokeObjectURL(url)
        }).catch(e => console.log(e.message))

    }

    return (

            <div className='w-full flex justify-center'>
                <button className='p-2 bg-green-500 hover:bg-green-700 rounded text-white' onClick={() => exportExcel()}>Gerar CSV</button>
            </div>
    )
}
