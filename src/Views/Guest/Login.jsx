import {Link} from "react-router-dom"
import logoPadrao from "../../assets/logo-unifae-2021.png"
import {useRef, useState} from "react"
import axiosInstance from "../../helper/axios-instance"
import {useStateContext} from "../../Contexts/ContextProvider";
import {useAlert} from "../../Components/hooks/useAlert";
import {AlertErro} from "../../Components/Alerts/AlertErro";


export default function Login() {


    const emailRef = useRef(null)
    const senhaRef = useRef(null)
    const {token, setUser, setSessionToken} = useStateContext()
    const [errors, setError] = useState("")
    const {isAlertOpen, setIsAlertOpen} = useAlert()

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            email: emailRef.current.value,
            senha: senhaRef.current.value,
        }

        axiosInstance.post('/login', payload)
            .then(({data}) => {

                console.log(data)

                setUser(data.user)
                setSessionToken(data.token)
            })
            .catch(error => {
                const response = error.response
                if (response) {
                    setError(response.data)
                }
                if (response.data.msg) {
                    setIsAlertOpen(true)
                }
            })
    }

    return (

        <>
            {isAlertOpen && (
                <AlertErro mensagem={errors.msg} onClose={() => setIsAlertOpen(false)} isAlertOpen={isAlertOpen}/>)}
            <div className=" bg-[#262626] min-h-screen flex justify-center items-center">
                <div className="md:w-1/2 bg-white rounded-md lg:w-[33vw] p-3 md:p-5 lg:p-10">
                    <div className="flex items-center flex-col h-[15vh] justify-center">
                        <img src={logoPadrao} alt="unifae-logo" className="w-3/4"/>
                        <span className="text-unifae-green-1 font-semibold">Intercurso</span>
                    </div>
                    <form className="flex flex-col items-center gap-6 p-4 lg:p-0" onSubmit={handleSubmit}>
                        <div className="flex flex-col justify-center">
                            <label className="text-lg" htmlFor="email">Email</label>
                            <input ref={emailRef}
                                   className={`input-login ${errors && errors.errors && errors.errors.email ? "input-error" : ""}`}
                                   type="text" name="email" id="email" placeholder="email@email.com"/>
                            {errors && errors.errors ? errors.errors.email &&
                                <p className="px-2 py-1 text-xs text-black/80">{errors.errors.email[0]}</p> : ""}
                        </div>
                        <div className="flex flex-col justify-center">
                            <label className="text-lg" htmlFor="senha">Senha</label>
                            <input ref={senhaRef}
                                   className={`input-login ${errors && errors.errors && errors.errors.senha ? "input-error" : ""}`}
                                   type="password" name="senha" id="senha" placeholder="••••••••"/>
                            {errors && errors.errors ? errors.errors.senha &&
                                <p className="px-2 py-1 text-xs text-black/80">{errors.errors.senha[0]}</p> : ""}
                        </div>
                        <p>Esqueceu sua senha? <Link to={'/redefinir-senha'} className="text-unifae-green-1 font-bold">Clique aqui</Link></p>
                        <button className="btn-lg btn-green">Entrar</button>
                        <p>Ainda não tem conta? <Link to={"/cadastro"} className="text-unifae-green-1 font-bold">Clique
                            aqui</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}