import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {App} from './App'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {ContextProvider} from './Contexts/ContextProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ContextProvider>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </ContextProvider>
        </BrowserRouter>
    </React.StrictMode>
)
