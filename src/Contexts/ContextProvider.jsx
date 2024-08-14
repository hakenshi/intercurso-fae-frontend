import {createContext, useState, useContext} from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {
    },
    setSessionToken: () => {
    },
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(sessionStorage.getItem('ACCESS_TOKEN') || null);
    const setSessionToken = (token) => {
        setToken(token)

        if (token) {
            sessionStorage.setItem('ACCESS_TOKEN', token);
        } else {
            sessionStorage.removeItem('ACCESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{user, token, setUser, setSessionToken}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)