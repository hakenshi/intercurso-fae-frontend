import React from 'react'
import {SearchResult} from './SearchResult'
import p from "prop-types"

export const SearchResultList = ({results, onClick}) => {
    return (
        <ul className={`${results.length <= 0 ? "hidden" : 'absolute z-30 bg-unifae-white-1 border border-unifae-green-1 shadow-lg overflow-y-scroll p-4 rounded-xl w-[30%] max-h-96'} `}>
            {results.map(result => {
                return <SearchResult result={result} key={result.id} onClick={onClick}/>
            })}
        </ul>
    )
}

SearchResultList.propTypes = {
    results: p.array,
    onClick: p.func,
}