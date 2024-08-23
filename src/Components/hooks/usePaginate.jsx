import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import axiosInstance from "../../helper/axios-instance";
import {faL} from "@fortawesome/free-solid-svg-icons";

export default function usePagiante(apiUrl) {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const fetchData = useCallback((page = currentPage) => {
        setLoading(true)
        axiosInstance.get(`${apiUrl}?page=${currentPage}`)
            .then(response => {
                setData(response.data.data)
                setLastPage(response.data.meta.last_page)
                setLoading(false)
            })
            .catch(error => console.error('Erro ao carregar os dados' + error))
    }, [apiUrl, currentPage])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return {data, setData, currentPage, lastPage, loading, handlePageChange, fetchData}
}

