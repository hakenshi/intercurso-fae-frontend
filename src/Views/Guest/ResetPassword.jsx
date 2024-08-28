import logoPadrao from "../../assets/logo-unifae-2021.png";
import {Link, Navigate} from "react-router-dom";
import {useRef, useState} from "react";
import axiosInstance from "../../helper/axios-instance.js";
import {AlertErro} from "../../Components/Alerts/AlertErro.jsx";
import {handleError} from "../../utils/handleError.js";
import {useAlert} from "../../Components/hooks/useAlert.jsx";
import {AlertSucesso} from "../../Components/Alerts/AlertSucesso.jsx";
import {Loading} from "../../Components/Loading.jsx";

export const ResetPassword = () => {

  const emailRef = useRef(null)
  const [errors, setError] = useState("")
  const [pending, setIsPending] = useState(false)
  const {mensagem, setMensagem, isAlertOpen, setIsAlertOpen} = useAlert()

  const handleSubmit = async e => {
    e.preventDefault()
    setIsPending(true)
    const {data} = await axiosInstance.post('/reset-password', {email: emailRef.current.value})

    const success = data.success
    const error = data.error

    if(success == true){
    console.log(success)
      setMensagem('Email enviado com sucesso')
      setIsAlertOpen(true)
      setIsPending(false)
    }
  if(error){
     setError(error)
      setIsPending(false)
    }
  }

  return (
      <>

        <AlertSucesso isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false) } mensagem={mensagem} />

      <div className=" bg-[#262626] min-h-screen flex justify-center items-center">
        <div className="md:w-1/2 bg-white rounded-md lg:w-[33vw] p-3 md:p-5 lg:p-10">
          <div className="flex items-center flex-col h-[15vh] justify-center">
            <img src={logoPadrao} alt="unifae-logo" className="w-3/4"/>
            <span className="text-unifae-gray-1 text-2xl font-semibold">Intercurso</span>
          </div>
          <form className="flex flex-col items-center gap-6 p-4 lg:p-0" onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center">
              <label className="text-lg" htmlFor="email">Email</label>
              <input ref={emailRef}
                     className={`input-login ${errors && errors.error ? "input-error" : ""}`}
                     type="text" name="email" id="email" placeholder="email@sou.fae.br"/>
              {errors && errors.error &&
                  <p className="px-2 py-1 text-xs text-black/80">{errors.error}</p>}
            </div>
            <button disabled={pending} className="disabled:cursor-wait- btn-lg bg-unifae-gray-1 text-white rounded">{pending ? "Enviando..." : "Enviar"}</button>
            <p>Lembrou a senha? <Link to={'/login'} className="text-unifae-gray-1 font-bold">Faça login</Link></p>
          </form>
        </div>
      </div>

      </>
  )
}
