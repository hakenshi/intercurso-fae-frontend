import { useEffect, useState } from "react";
import { Card } from "../../Card";
import axiosInstance from "../../helper/axios-instance";
import { handleError } from "../../utils/handleError";
import { Loading } from "../../Components/Loading";
import {
    faBasketball,
    faChess,
    faFutbol,
    faGlobe,
    faHandDots,
    faHeadset,
    faHeart,
    faVolleyball
} from "@fortawesome/free-solid-svg-icons";

import { faHeart as faHeartHollow } from "@fortawesome/free-regular-svg-icons"

import { motion } from "framer-motion";
import { ButtonCategoria } from "../../Components/Buttons/ButtonCategoria";
import { useAlert } from "../../Components/hooks/useAlert";
import { Modal } from "../../Components/Modal";
import { ModalDefault } from "../../Components/Modal/ModalDefault";
import { images } from "../../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Jogos() {

    const [jogos, setJogos] = useState([])
    const [modalidades, setModalidades] = useState([])
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState("")
    const [categoria, setCategoira] = useState(null)
    const [genero, setGenero] = useState(null)
    const [title, setTitle] = useState("")
    const { setIsAlertOpen, isAlertOpen } = useAlert()
    const [torcida, setTorcida] = useState([{
        times: null,
        jogo: null,
        likes: null,
    }])

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
                    if (data.data.length > 0) {
                        setJogos(data.data)
                    }
                })
                .catch(e => handleError(e))
        }
        const fetchModalidades = () => {
            axiosInstance.get("/modalidades")
                .then(({ data }) => {
                    if (data.data.length > 0) {
                        setModalidades(data.data)
                    }
                })
                .catch(e => handleError(e))
        }

        if (jogos.length === 0 && modalidades.length === 0) {
            fetchJogos()
            fetchModalidades()
            setLoading(false)
        }
    }, [])


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

    const handleSetTorcida = (time, jogo, likes) => {
        setIsAlertOpen(true)
        setTorcida({
            times: time,
            jogo: jogo,
            likes: likes
        })
    }
    
    const handleLike = (time, id_jogo) => {
        
        axiosInstance.post('/likes/store',{
            id_time: time,
            id_jogo: id_jogo
        })
        .then(({data}) => {

            if(data.message){
                alert(data.message)
                return
            }
            
            setTorcida(t => ({
                ...t,
                likes: {
                    ...data
                }
            }))

            setJogos(j => j.map(jogo => {
                if(jogo.jogo.id === id_jogo){
                    return({
                        ...jogo,
                        jogo: {
                            ...jogo.jogo,
                            likes: {
                                ...data
                            }
                        }
                    })
                }
                return jogo
            }))
            
        })
        .catch(e => handleError(e))        
    }
    if (loading) {
        return <Loading />
    }
    
    return (
        <>

            {isAlertOpen && (
                <Modal.Root onClose={() => {
                    setIsAlertOpen(false)
                    setTorcida([])
                }} isOpen={isAlertOpen}>
                    <Modal.Default>
                        <h2 className="text-center text-3xl font-medium mb-5">Torcidômetro</h2>
                        <motion.div
                            className="flex w-full md:min-w-[700px] space-x-5 gap-5 justify-center md:justify-evenly p-5 bg-gradient-to-tr from-unifae-green-1 to-unifae-green-3 rounded-lg shadow-lg"
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.div
                                className="flex flex-col items-center text-3xl text-unifae-white-1"
                            >
                                <div className="relative">
                                    <motion.img
                                        className="w-32 h-32 md:w-48 md:h-48 border-4 border-unifae-green-4 rounded-full shadow-md"
                                        src={images.timeFoto}
                                        alt=""
                                    />
                                </div>
                                <p className="mt-3 font-semibold truncate max-w-32 md:max-w-72">{torcida.times.time1.nome}</p>
                                <motion.p
                                    onClick={() => handleLike(torcida.times.time1.id, torcida.jogo)}
                                    className="text-center text-2xl mt-2 bg-unifae-gray-2 text-unifae-white-1 px-4 py-2 rounded-full shadow-inner hover:cursor-pointer"
                                    whileHover={{
                                        scale: 1.05
                                    }}
                                >
                                    <FontAwesomeIcon icon={faHeartHollow} />
                                    <p>{torcida.likes.likes_time_1}</p>
                                </motion.p>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center text-3xl text-unifae-white-1"
                            >
                                <div className="relative">
                                    <motion.img
                                        className="w-32 h-32 md:w-48 md:h-48 border-4 border-unifae-green-4 rounded-full shadow-md"
                                        src={images.timeFoto}
                                        alt=""
                                    />
                                </div>
                                <p className="mt-3 font-semibold truncate max-w-32 md:max-w-72">{torcida.times.time2.nome}</p>
                                <motion.p
                                    onClick={() => handleLike(torcida.times.time2.id, torcida.jogo)}
                                    className="text-center text-2xl mt-2 bg-unifae-gray-2 text-unifae-white-1 px-4 py-2 rounded-full shadow-inner hover:cursor-pointer"
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                >
                                    <FontAwesomeIcon icon={faHeartHollow} />
                                    <p>{torcida.likes.likes_time_2}</p>
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    </Modal.Default>
                </Modal.Root>


            )}

            <div className="w-full flex flex-col items-center">
                <div className="md:w-2/3 flex flex-col gap-3 p-5 mt-5 justify-center items-center">
                    <div className="flex w-full md:w-1/2 items-center justify-around gap-3 md:gap-0">
                        <ButtonCategoria onClick={() => setCategoira("")} icon={faGlobe} text={"Todas"} />
                        <ButtonCategoria onClick={() => setCategoira("1")} icon={faHeadset} text={"E-sports"} />
                        <ButtonCategoria onClick={() => setCategoira("2")} icon={faFutbol} text={"Futebol"} />
                        <ButtonCategoria onClick={() => setCategoira("3")} icon={faVolleyball} text={"Vôleibol"} />
                        <ButtonCategoria onClick={() => setCategoira("4")} icon={faHandDots} text={"Handebol"} />
                        <ButtonCategoria onClick={() => setCategoira("5")} icon={faBasketball} text={"Basquete"} />
                    </div>
                </div>

                <div className="w-full flex md:flex-row flex-col items-center justify-center gap-5">
                    <select onChange={handleChangeJogos} className="border border-collapse border-black w-11/12 md:w-96 p-3 rounded-lg bg-white">
                        <option value="">Todos os jogos</option>
                        <option value="0">Encerrados</option>
                        <option value="1">Próximos Jogos</option>
                    </select>
                    <select onChange={handleChangeGenero} className="border border-collapse border-black w-11/12 md:w-96 p-3 rounded-lg bg-white">
                        <option value="">Todos os gêneros</option>
                        <option value="0">Masculino</option>
                        <option value="1">Feminino</option>
                    </select>
                </div>
                {jogos.length > 0 ? <><h2 className="text-center p-2 text-3xl uppercase font font-bold">{title ? title : "Jogos do Intercurso"}</h2>
                    <div className="flex flex-col max-h-[65vh] overflow-y-scroll rounded-md">
                        <div className="p-5 flex justify-center gap-5 flex-wrap md:max-w-screen-xl">
                            {filteredJogos.map(({ jogo, modalidade, placar, times }) => (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    key={jogo.id}>
                                    {jogo.status === 1 ? (
                                        <Card.Root onClick={() => handleSetTorcida(times, jogo.id, jogo.likes)} >
                                            <Card.TimePlacar modalidade={modalidade} times={times} placar={placar} />
                                            <div className="p-2 mt-0">
                                                <Card.Local local={jogo.local} />
                                                <Card.Info data={`${jogo.data_jogo}, ${jogo.hora_jogo}`} />
                                            </div>
                                        </Card.Root>
                                    ) : (
                                        <Card.Root key={jogo.id}>
                                            <Card.TimePlacar modalidade={modalidade} times={times} placar={placar} />
                                            <p>Encerrado</p>
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