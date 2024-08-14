import {useState} from "react"

export const useAlert = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false)
    const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false)

    const [mensagem, setMensagem] = useState("")

    const handleClose = () => {
        setIsAlertOpen(false)
    }

    return {
        isAlertOpen,
        setIsAlertOpen,
        handleClose,
        mensagem,
        setMensagem,
        isErrorAlertOpen,
        setIsErrorAlertOpen,
        isConfirmAlertOpen,
        setIsConfirmAlertOpen,
    }

}

