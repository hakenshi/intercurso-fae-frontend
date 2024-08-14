import {faPlus} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

export const SearchResult = ({result, onClick}) => {
    return (
        <li className="hover:bg-unifae-gray50-2 p-1 rounded-md cursor-pointer"
            onClick={() => onClick(result.id, result.nome)}>{`${result.nome}`}</li>
    )
}
