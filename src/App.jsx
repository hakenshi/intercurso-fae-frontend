import {Route, Routes} from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout.jsx'
import Jogos from "./Views/Default/Jogos";
import Placares from "./Views/Default/Placares";
import VerTimes from "./Views/Default/VerTimes";
import Login from "./Views/Guest/Login";
import Cadastro from "./Views/Guest/Cadastro";
import NotFound from "./Views/html error codes/NotFound";
import Dashboard from "./Views/Admin/Dashboard";
import {Modalidades} from "./Views/Admin/Modalidades";
import {Times} from "./Views/Admin/Times";
import {Usuarios} from "./Views/Admin/Usuarios";
import {MeusTimes} from "./Views/Responsavel/MeusTimes";
import {Perfil} from "./Views/Default/Perfil";
import {Configuracoes} from "./Views/Default/Configuracoes";
import {useMediaQuery} from '@react-hook/media-query';
import AdminLayout from './layouts/AdminLayout.jsx';
import ResponsavelLayout from './layouts/ResponsavelLayout.jsx';
import {MeuTime} from './Views/Default/MeuTime.jsx';
import LoginLayout from './layouts/LoginLayout.jsx';
import GuestLayout from './layouts/GuestLayout.jsx';
import {ProtectedRoute} from './utils/ProtectedRoute.jsx';
import {useStateContext} from './Contexts/ContextProvider.jsx';
import {AdminJogos} from './Views/Admin/AdminJogos.jsx';
import {ResetPassword} from "./Views/Guest/ResetPassword.jsx";
import NotAuthorized from "./Views/html error codes/NotAuthorized.jsx";


export const App = () => {

    const isMobile = useMediaQuery("(max-width: 768px)");
    const {user} = useStateContext();

    return (
        <Routes>
            <Route path='/' element={<GuestLayout isMobile={isMobile}/>}>
                <Route index element={<Jogos/>}/>
                 <Route path='nao-autorizado' element={<NotAuthorized />} />
            </Route>

            <Route path="/" element={<LoginLayout/>}>
                <Route path="login" element={<Login/>}/>
                <Route path="cadastro" element={<Cadastro/>}/>
                <Route path="redefinir-senha" element={<ResetPassword/>}/>
            </Route>

            <Route element={<ProtectedRoute role={"1"}/>}>
                <Route path='/admin' element={<AdminLayout isMobile={isMobile}/>}>
                    <Route index path="dashboard" element={<Dashboard/>}/>
                    <Route path="usuarios" element={<Usuarios/>}/>
                    <Route path="modalidades" element={<Modalidades/>}/>
                    <Route path="times" element={<Times/>}/>
                    <Route path="jogos" element={<AdminJogos/>}/>
                    <Route path="meu-perfil" element={<Perfil/>}/>
                </Route>
            </Route>

            <Route element={<ProtectedRoute role={"2"}/>}>
                <Route path='/responsavel' element={<ResponsavelLayout isMobile={isMobile}/>}>
                    <Route path="meus-times" element={<MeusTimes id={user.id}/>}/>
                    <Route path="times-intercurso" element={<MeuTime/>}/>
                    <Route path="jogos" element={<Jogos/>}/>
                    <Route path="meu-perfil" element={<Perfil/>}/>
                </Route>
            </Route>

            <Route element={<ProtectedRoute role={"3"}/>}>
                <Route path='/usuario' element={<DefaultLayout isMobile={isMobile}/>}>
                    <Route path="meus-times" element={<MeuTime id={user.id}/>}/>
                    <Route path="jogos" element={<Jogos/>}/>
                    <Route path="placares" element={<Placares/>}/>
                    <Route path="times-intercurso" element={<VerTimes/>}/>
                    <Route path="meu-perfil" element={<Perfil/>}/>
                    <Route path="configuracoes" element={<Configuracoes/>}/>
                </Route>
            </Route>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}