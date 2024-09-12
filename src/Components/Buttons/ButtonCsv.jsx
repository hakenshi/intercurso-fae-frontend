import axiosInstance from '../../helper/axios-instance'

export default function ButtonCsv({times}) {


    const exportExcel = () => {

        axiosInstance.post('/export', times, {responseType:'blob'})
        .then(response => {

            console.log(response.headers['content-type']);

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
                <button className='p-2 bg-green-500 hover:bg-green-700 rounded text-white' onClick={() => exportExcel()}>Exportar</button>
            </div>
    )
}
