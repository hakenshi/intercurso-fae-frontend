import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"

export default function AsideItem({icon, text}) {
    return <div className="flex items-center justify-start text-white text-lg gap-6 p-1"><FontAwesomeIcon
        icon={icon}/> {text}</div>
}
AsideItem.propTypes = {
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired
}