import { useEffect, useState } from "react";
import { Card } from "../../Card";
import axiosInstance from "../../helper/axios-instance";
import { handleError } from "../../utils/handleError";
import { Loading } from "../../Components/Loading";
import {
    faBasketball,
    faFutbol,
    faGlobe,
    faHandDots,
    faHeadset,
    faTableTennisPaddleBall,
    faVolleyball
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { ButtonCategoria } from "../../Components/Buttons/ButtonCategoria";

export default function Jogos() {

    const [jogos, setJogos] = useState([])
    const [modalidades, setModalidades] = useState([])
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState("")
    const [categoria, setCategoira] = useState(null)
    const [genero, setGenero] = useState(null)
    const [title, setTitle] = useState("")

    const filteredJogos = jogos.filter(({ jogo, modalidade }) => {
        const statusFilter = status === "0" ? jogo.status === 0
            : status === "1" ? jogo.status === 1
                : true

        const categoriaFilter = categoria ? modalidade.categoria.id == categoria : true

        const generoFilter = genero ? modalidade.genero.includes(genero) : true;
        return statusFilter && categoriaFilter && generoFilter
    })

    useEffect(() => {
        const fetchJogos = () => {
            axiosInstance.get("/jogos")
                .then(({ data }) => {
                    setJogos(data.data)
                })
                .catch(e => handleError(e))
        }
        const fetchModalidades = () => {
            axiosInstance.get("/modalidades")
                .then(({ data }) => {
                    setModalidades(data.data)

                })
                .catch(e => handleError(e))
        }

        if (jogos.length === 0 && modalidades.length === 0) {
            fetchJogos()
            fetchModalidades()
            setLoading(false)
        }
    }, [jogos, modalidades])


    const handleChangeJogos = e => {

        const titles = ["Encerrados", 'Próximos Jogos']

        setTimeout(() => {
            setTitle(titles[e.target.value])
            setStatus(e.target.value)
        }, 150)
    }

    const handleChangeGenero = e => {
        setGenero(e.target.value)
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className="w-full flex flex-col items-center">
                <div className="md:w-2/3 flex flex-col gap-3 p-5 justify-center items-center">
                    <div className="flex w-full md:w-1/2 items-center justify-around gap-3 md:gap-0">
                        <ButtonCategoria onClick={() => setCategoira("")} icon={faGlobe} text={"Todas"} />
                        <ButtonCategoria onClick={() => setCategoira("1")} icon={faHeadset} text={"E-sports"} />
                        <ButtonCategoria onClick={() => setCategoira("2")} icon={faFutbol} text={"Futebol"} />
                        <ButtonCategoria onClick={() => setCategoira("3")} icon={faVolleyball} text={"Vôleibol"} />
                        <ButtonCategoria onClick={() => setCategoira("4")} icon={faHandDots} text={"Handebol"} />
                        <ButtonCategoria onClick={() => setCategoira("5")} icon={faBasketball} text={"Basquete"} />
                        <ButtonCategoria onClick={() => setCategoira("6")} icon={faTableTennisPaddleBall}
                            text={"Mesa"} />
                    </div>
                </div>

                <div className="w-full flex md:flex-row flex-col items-center justify-center gap-5">
                    <select onChange={handleChangeJogos} className="input-cadastro bg-white">
                        <option value="">Escolha um filtro</option>
                        <option value="0">Encerrados</option>
                        <option value="1">Próximos Jogos</option>
                    </select>
                    <select onChange={handleChangeGenero} className="input-cadastro bg-white">
                        <option value="">Escolha um Gênero</option>
                        <option value="0">Masculino</option>
                        <option value="1">Feminino</option>
                    </select>
                </div>
                {jogos.length > 0 ? <><h2 className="text-center p-2 text-3xl uppercase font font-bold">{title ? title : "Jogos do Intercurso"}</h2>
                    <div className="flex flex-col max-h-[65vh] overflow-y-scroll">
                        <div className="p-5 flex gap-5 flex-wrap md:max-w-screen-xl">
                            {filteredJogos.map(({ jogo, modalidade, placar, times }) => (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    key={jogo.id}>
                                    {jogo.status === 1 ? (
                                        <Card.Root>
                                            <Card.TimeDefault modalidade={modalidade.nome} times={times}
                                                genero={modalidade.genero} />
                                            <div className="p-2 mt-0">
                                                <Card.Local local={jogo.local} />
                                                <Card.Info data={`${jogo.data_jogo}, ${jogo.hora_jogo}`} />
                                            </div>
                                        </Card.Root>
                                    ) : (
                                        <Card.Root key={jogo.id}>
                                            <Card.TimePlacar modalidade={modalidade} times={times} placar={placar} />
                                            <Card.Local local={`Encerrado`} />
                                            <Card.Info data={`Vencedor: ${placar.time_vencedor.nome}`} />
                                        </Card.Root>
                                    )}
                                </motion.div>
                            )
                            )}
                        </div>
                    </div>
                </> : <div className="p-5"><h2>Nenhum jogo foi marcado ainda</h2></div>}
            </div>
        </>
    )
}