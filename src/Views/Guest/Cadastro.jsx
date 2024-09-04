import {Link} from "react-router-dom";
import cursos from "../../../public/cursos.json"
import logoPadrao from "../../assets/logo-unifae-2021.png";
import React, {useRef, useState} from "react";
import axiosInstance from "../../helper/axios-instance";
import {useStateContext} from "../../Contexts/ContextProvider";
import {useAlert} from "../../Components/hooks/useAlert";
import {AlertErro} from "../../Components/Alerts/AlertErro";
import ReactInputMask from "react-input-mask";
import {Modal} from "../../Components/Modal/index.jsx";

export default function Cadastro() {

    const nomeRef = useRef(null);
    const emailRef = useRef(null);
    const senhaRef = useRef(null);
    const raRef = useRef(null);
    const cursoRef = useRef(null);
    const confirmSenhaRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false)

    const [responses, setResponses] = useState({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        question6: '',
        question7: '',
        accept_responsibility: false,
    });

    const {setUser, setSessionToken} = useStateContext()

    const [errors, setError] = useState("")
    const {isAlertOpen, setIsAlertOpen,} = useAlert()
    const [isOpen, setIsOpen] = useState(false)
    const [isTermosOpen, setIsTermosOpen] = useState(false)
    const handleSubmit = e => {
        e.preventDefault()
        
        setIsLoading(true)

        if (senhaRef.current.value !== confirmSenhaRef.current.value) {
            setError("As senhas não coincidem!")
            setIsAlertOpen(true)
            senhaRef.current.value = null
            confirmSenhaRef.current.value = null
            return
        }

        if (Object.values(responses).includes('') && isOpen) {
            setError('Por favor, responda todas as perguntas');
            setIsAlertOpen(true)
            return;
        }
        if (isTermosOpen && !responses.acceptResponsibility) {
            setError("Por favor, aceite os termos de responsabilidade.")
            setIsAlertOpen(true)
            return;
        }


        const payload = {
            id_curso: cursoRef.current.value,
            nome: nomeRef.current.value,
            email: emailRef.current.value,
            senha: senhaRef.current.value,
            confirmSenha: confirmSenhaRef.current.value,
            ra: raRef.current.value,
            tipo_usuario: 3,
            questionario: {
                ...responses
            }
        }

        axiosInstance.post('/cadastro', payload)
            .then(({data}) => {
                setUser(data.user)
                setSessionToken(data.token)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error.response.data)
            })
            .finally(() => {
                setIsOpen(false)
                setIsTermosOpen(false)
                setIsLoading(false)
            })
    }

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setResponses({
            ...responses,
            [name]: type === 'checkbox' ? checked : value,
        });
        if (value === "Sim" && !responses.acceptResponsibility) {
            setIsTermosOpen(true)
        }

    };

    const handleForm = e => {
        
        e.preventDefault()

        alert('As inscrições acabaram!\nQue peninha :c ')

        return

        if (
            !cursoRef.current.value ||
            !nomeRef.current.value ||
            !emailRef.current.value ||
            !senhaRef.current.value ||
            !confirmSenhaRef.current.value ||
            !raRef.current.value
        ) {
            handleSubmit(e)
        } else {
            setIsOpen(true)
        }
    }

    return (
        <>
            {isAlertOpen && (
                <AlertErro mensagem={errors} onClose={() => setIsAlertOpen(false)} isAlertOpen={isAlertOpen}/>)}

            {isOpen &&
                <Modal.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <Modal.Form onSubmit={handleSubmit}>
                        <div
                            className={"md:max-w-screen-md max-w-screen-sm max-h-min overflow-scroll text-justify px-2"}>
                            <h2 className="text-2xl font-bold text-center">Questionário de Prontidão para Atividade
                                Física (PAR-Q)</h2>
                            <p className={"p-2"}>
                                Este questionário tem o objetivo de identificar a necessidade de avaliação por um médico
                                antes
                                do início da atividade física. Caso você responda “SIM” a uma ou mais perguntas,
                                converse com
                                seu médico ANTES de aumentar seu nível atual de atividade física. Mencione este
                                questionário e
                                as perguntas às quais você respondeu “SIM”.
                            </p>
                        </div>

                        <div className={"flex items-center flex-col gap-2"}>
                            <div
                                className={"md:max-w-screen-md w-11/12 max-h-[250px] md:max-h-[325px] overflow-y-scroll text-justify space-y-1 flex flex-col gap-2 border-unifae-green-1 border border-collapse p-5 rounded-xl"}>
                                {['1. Algum médico já disse que você possui algum problema de coração e que só deveria realizar atividade física supervisionado por profissionais de saúde?',
                                    '2. Você sente dores no peito quando pratica atividade física?',
                                    '3. No último mês, você sentiu dores no peito quando praticou atividade física?',
                                    '4. Você apresenta desequilíbrio devido à tontura e/ ou perda de consciência?',
                                    '5. Você possui algum problema ósseo ou articular que poderia ser piorado pela atividade física?',
                                    '6. Você toma atualmente algum medicamento para pressão arterial e/ou problema de coração?',
                                    '7. Sabe de alguma outra razão pela qual você não deve praticar atividade física?']
                                    .map((question, index) => (
                                        <div key={index}>
                                            <p className={"p-1"}>{question}</p>
                                            <div className={"flex gap-1"}>
                                                <input
                                                    className={"bg-unifae-green-1"}
                                                    type="radio"
                                                    name={`question${index + 1}`}
                                                    value="Sim"
                                                    checked={responses[`question${index + 1}`] === 'Sim'}
                                                    onChange={handleChange}
                                                />
                                                <label>
                                                    Sim
                                                </label>

                                                <input
                                                    className={"bg-unifae-green-1"}
                                                    type="radio"
                                                    name={`question${index + 1}`}
                                                    value="Não"
                                                    checked={responses[`question${index + 1}`] === 'Não'}
                                                    onChange={handleChange}
                                                />
                                                <label>

                                                    Não
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            {isTermosOpen && (<>
                                <div className={"md:max-w-screen-md text-justify px-2"}>
                                    <h3 className="text-2xl font-bold text-center">
                                        Termo de Responsabilidade
                                        para
                                        Prática de Atividade Física</h3>
                                    <p className="p-2">
                                        Estou ciente de que é recomendável conversar com um médico antes de aumentar
                                        meu
                                        nível atual de atividade física, por ter respondido “SIM” a uma ou mais
                                        perguntas do “Questionário
                                        de Prontidão para Atividade Física” (PAR-Q). Assumo plena responsabilidade
                                        por
                                        qualquer
                                        atividade física praticada sem o atendimento a essa recomendação.
                                    </p>
                                </div>
                                <div
                                    className={"md:max-w-screen-md w-11/12 max-h-[250px] md:max-h-[325px] overflow-y-scroll text-justify space-y-1 flex  items-center gap-2 border-unifae-green-1 border border-collapse p-5 rounded-xl"}>
                                    <input
                                        type="checkbox"
                                        className={"check-box"}
                                        name="acceptResponsibility"
                                        checked={responses.acceptResponsibility}
                                        onChange={handleChange}
                                    />
                                    <label className={"flex items-center gap-3"}>
                                        Eu aceito a responsabilidade.
                                    </label>
                                </div>
                            </>)}
                        </div>

                    </Modal.Form>
                </Modal.Root>
            }
            <section className="bg-[#262626] min-h-screen flex justify-center items-center">
                <div className="size-full p-3 max-w-screen-lg  bg-white rounded-md">
                    <div className="flex items-center flex-col h-1/5 justify-center">
                        <img src={logoPadrao} alt="unifae-logo" className="w-1/3"/>
                        <span className="text-unifae-gray-1 text-2xl font-semibold">Intercurso</span>
                    </div>
                    <form className="flex flex-col md:flex-row justify-center">
                        <div className="flex flex-col w-full md:w-1/2 gap-1 p-2">
                            <div className="flex flex-col">
                                <label className="text-start text-lg" htmlFor="nome">Nome</label>
                                <input ref={nomeRef}
                                       className={`${errors && errors.errors && errors.errors.nome ? 'input-error-cadastro' : 'input-cadastro'}`}
                                       type="text" name="nome" id="nome" placeholder="Insira seu nome"/>
                                {errors && errors.errors ? errors.errors.nome &&
                                    <p className="p-1 text-xs text-black/80">{errors.errors.nome[0]}</p> : ""}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-start text-lg" htmlFor="email">E-mail</label>
                                <input ref={emailRef}
                                       className={`${errors && errors.errors && errors.errors.email ? "input-error-cadastro" : "input-cadastro"}`}
                                       type="text" name="email" id="email"
                                       placeholder="Insira seu email institucional"/>
                                {errors && errors.errors ? errors.errors.email &&
                                    <p className="p-1 text-xs text-black/80">{errors.errors.email[0]}</p> : ""}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-start text-lg" htmlFor="senha">Senha</label>
                                <input ref={senhaRef}
                                       className={`${errors && errors.errors && errors.errors.senha ? "input-error-cadastro" : "input-cadastro"}`}
                                       type="password" name="senha" id="senha" placeholder="••••••••"/>
                                {errors && errors.errors ? errors.errors.senha &&
                                    <p className="p-1 text-xs text-black/80">{errors.errors.senha[0]}</p> : ""}
                            </div>
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 gap-1 p-2">
                            <div className="flex flex-col">
                                <label className="text-start text-lg" htmlFor="ra">RA</label>
                                <ReactInputMask mask={"99999-9"} ref={raRef}
                                                className={`${errors && errors.errors && errors.errors.ra ? "input-error-cadastro" : "input-cadastro"}`}
                                                type="text" name="ra" id="ra" placeholder="00000-0"/>
                                {errors && errors.errors ? errors.errors.senha &&
                                    <p className="p-1 text-xs text-black/80">{errors.errors.ra[0]}</p> : ""}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-start text-lg" htmlFor="email">Curso</label>
                                <select ref={cursoRef}
                                        className={`${errors && errors.errors && errors.errors.id_curso ? "input-error-cadastro" : "input-cadastro"} bg-white`}
                                        name="curso" id="curso">
                                    {cursos.map((curso, key) => <option key={key}
                                                                        value={curso.value}>{curso.curso}</option>)}
                                </select>
                                {errors && errors.errors ? errors.errors.senha &&
                                    <p className="p-1 text-xs text-black/80">{errors.errors.id_curso[0]}</p> : ""}
                            </div>
                            <div className="flex flex-col">
                                <label className="text-start text-lg" htmlFor="confirm-password">Confirme sua
                                    senha</label>
                                <input ref={confirmSenhaRef}
                                       className={`${errors && errors.errors && errors.errors.senha ? "input-error-cadastro" : "input-cadastro"}`}
                                       type="password" name="confirm-password" id="confirm-password"
                                       placeholder="••••••••"/>
                                {errors && errors.errors ? errors.errors.senha &&
                                    <p className="p-1 text-xs text-black/80">{errors.errors.senha[0]}</p> : ""}
                            </div>
                        </div>
                    </form>
                    <div className="flex flex-col w-full items-center p-3">
                        <p className="p-2">Já tem conta? <Link to={"/login"}
                                                               className="text-unifae-gray-1 font-semibold"> Clique
                            aqui</Link></p>
                        <button disabled={isLoading} type="submit" onClick={handleForm} className="btn-lg bg-unifae-gray-1 text-white rounded">{isLoading ? "Enviando..." : "Fazer Cadastro"}</button>
                    </div>
                </div>
            </section>
        </>
    )
}
