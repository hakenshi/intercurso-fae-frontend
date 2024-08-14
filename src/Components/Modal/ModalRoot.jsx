import p from "prop-types"
import {ButtonClose} from "../Buttons/ButtonClose"
import {createPortal} from "react-dom"

const ModalBackground = ({children}) => {
    return (
        <div className="flex items-center justify-center min-w-full min-h-full bg-unifae-black-1/50 1 z-[2] absolute left-0 top-0">
            {children}
        </div>
    )
}

const ModalContainer = ({children}) => {
    return (
        <div className="bg-unifae-white-1 w-full h-fit md:w-fit md:h-fit md:p-5 rounded-lg z-[2]">
            {children}
        </div>
    )
}

export const ModalRoot = ({children, isOpen, onClose, hasButton = true}) => {
    if (isOpen)
        return (
            createPortal(
                <ModalBackground>
                    <ModalContainer>
                        {hasButton ? <ButtonClose onClose={onClose}/> : ""}
                        {children}
                    </ModalContainer>
                </ModalBackground>,
                document.body)
        )
}


ModalRoot.propTypes = {
    children: p.node,
    isOpen: p.bool,
    onClose: p.func,
}
