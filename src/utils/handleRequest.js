import axiosInstance from "../helper/axios-instance";

export function handleRequest(url, method, payload) {
    return axiosInstance[method](url, payload)
}