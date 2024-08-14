import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
})

axiosInstance.interceptors.request.use(config => {
    const token = sessionStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

axios.interceptors.response.use(response => {
        return response
    }, error => {
        try {
            const {response} = error

            console.log(response.status)

            if (response.status === 401) sessionStorage.removeItem('ACCESS_TOKEN')
        } catch (error) {
            console.log(error)
        }
    }
)

export default axiosInstance