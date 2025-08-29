import './Cabecalho.css'
import LogoBranca from '../../assets/images/logo-completa-branca.png'
import IconUsuario from '../../assets/icons/icon-usuario.png'
import { Link, useNavigate } from 'react-router-dom'

const Cabecalho = () => {

  const navigate = useNavigate();

  const getUsuarioLogado = () => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    return usuarioLogado ? JSON.parse(usuarioLogado) : null;
  };

  const handleBtnUserClick = () => {
    const usuarioLogado = getUsuarioLogado();

    if (!usuarioLogado) {
      alert("Ops! Parece que você ainda não está logado. Faça login para continuar.");
      navigate("/login");
      return;
    }

    navigate("/dados-conta");
  };
    return (
        <header>
            <img className="imagem-logo" src={LogoBranca} alt="Logo branca da Juntos pela Saúde" />

            <nav>
                <ul>
                    <li><Link to={"/"} className="active">Início</Link></li>
                    <li><Link to={"/agenda"}>Agenda</Link></li>
                    <li><Link to={"/faq"}>FAQ</Link></li>
                    <li><Link to={"/contato"}>Contato</Link></li>
                </ul>
            </nav>

            <button id="btn_user" onClick={handleBtnUserClick}>
                <img className="icone-usuario" src={IconUsuario} alt="Icone do usuário" />
            </button>

        </header>
    )
}

export default Cabecalho