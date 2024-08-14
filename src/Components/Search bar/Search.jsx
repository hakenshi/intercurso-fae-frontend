import {forwardRef, useState} from "react"
import axiosInstance from "../../helper/axios-instance"
import p from "prop-types"
import {SearchResultList} from "./SearchResultList"

export const Search = forwardRef(({placeholder, url, handleSelectUser, data}, ref) => {

    const [input, setInput] = useState(data ? data : "")
    const [results, setResults] = useState([])

    const fetchData = (value) => {

        if (value.trim() === "") setResults([])

        else {
            axiosInstance.get(url, {
                params: {
                    value: value
                }
            })
                .then(({data}) => {
                    setResults(data)
                })
                .catch(error => console.log(error))
        }
    }

    const handleChange = value => {
        setInput(value)
        fetchData(value)
    }

    const handleResultClick = (id, nome) => {
        setInput(nome)
        setResults([])
        handleSelectUser(id)
    }

    return (
        <>
            <div className="space-y-2">
                <input ref={ref} className="input-modal space-y-2" type="text" placeholder={placeholder} value={input}
                       onChange={(e) => handleChange(e.target.value)}/>
                <SearchResultList results={results} onClick={handleResultClick}/>
            </div>
        </>
    )
})

Search.displayName = "Search"

Search.propTypes = {
    placeholder: p.string,
    url: p.string,
}