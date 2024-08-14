import {useEffect, useRef, useState} from "react"

export default function useAxios(configRequest) {
    const {axiosInstance, method, url, configs = {}} = configRequest
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState('')
    const effectRun = useRef(false)

    useEffect(() => {

        const controller = new AbortController()

        const fetchData = async () => {
            try {
                const response = await axiosInstance[method.toLowerCase()](url, {
                    ...configs,
                    signal: controller.signal
                })

                setData(response)
            } catch (error) {
                setErrors(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()


        if (effectRun == true) {
            return () => {
                controller.abort()
                effectRun.current = true
            }
        }
    }, [])

    return [data, loading, errors]
}   