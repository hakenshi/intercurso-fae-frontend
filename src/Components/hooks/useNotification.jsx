import {useEffect, useState} from "react"
import axiosInstance from "../../helper/axios-instance"
import {Navigate} from "react-router-dom"

const useNotification = (id) => {
    const [notificacao, setNotificacao] = useState([])

    useEffect(() => {
        if (id) {
            axiosInstance.get(`/notificacao/${id}`)
                .then(({data}) => {
                    if (data && data.data.length > 0) {
                        setNotificacao(data.data);
                    }
                })
                .catch(errors => {
                    const response = errors.response

                    if (response) {
                        console.log(response.data)
                    }
                })
        }
    }, [id])

    const clearNotifications = (data) => {
        if (data) {
            axiosInstance.post(`/notificacao/limpar-notificacao`, data.map(({id}) => id.toString()))
                .then(({data}) => {
                    data.data.forEach(({id}) => {
                        setNotificacao(n => n.filter(item => id !== item.id))
                        // return <Navigate to={`${link}`} />
                    })
                })
                .catch(errors => {
                    const response = errors.response

                    if (response) {
                        console.log(response.data)
                    }
                })
        }
    }
    const readNotification = (id) => {
        if (id) {
            axiosInstance.patch(`/notificacao/ler-notificacao/${id}`)
                .then(() => setNotificacao(n => n.filter(item => id !== item.id)))
                .catch((errors) => console.log(errors))
        }
    }
    return {notificacao, clearNotifications, readNotification}
}


export default useNotification