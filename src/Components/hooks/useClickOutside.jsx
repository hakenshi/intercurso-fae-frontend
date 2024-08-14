import {useEffect, useRef} from "react";

export const useClickOutSide = (handler) => {
    const domNode = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (domNode.current && !domNode.current.contains(e.target)) {
                handler()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)


        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    }, [])

    return domNode
}

