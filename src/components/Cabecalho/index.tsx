import './Cabecalho.css'
import LogoBranca from '../../assets/images/logo-completa-branca.png'
import IconUsuario from '../../assets/icons/icon-usuario.png'
import { Link } from 'react-router-dom'

const Cabecalho = () => {
    return(
        <header>
            <img className="imagem-logo" src={LogoBranca} alt="Logo branca da Juntos pela Saúde" />

        <nav>
            <ul>
                <li><Link to={"/"} className="active">Início</Link></li>
                <li><Link to={"/agenda"}>Agenda</Link></li>
                <li><Link to={"/faq"}>FAQ</Link></li>
                <li><Link to={"/sobre"}>Sobre</Link></li>
            </ul>
        </nav>

         <button id="btn_user">
             <img className="icone-usuario" src={IconUsuario} alt="Icone do usuário"/>
        </button>

        </header>
        
    )
}

export default Cabecalho;