import LogoBranca from "../../assets/images/logo-completa-branca.png";
import IconUsuario from "../../assets/icons/icon-usuario.png";
import { Link } from "react-router-dom";


interface Usuario {
  id: number;
  nome: string;
  email: string;
}

const Cabecalho = () => {
  const getUsuarioLogado = (): Usuario | null => {
    try {
      const usuarioLogado = localStorage.getItem("usuarioLogado");
      return usuarioLogado ? (JSON.parse(usuarioLogado) as Usuario) : null;
    } catch {
      return null;
    }
  };

  const usuarioLogado = getUsuarioLogado();

  return (
    <header className="cabecalho">
      <Link to={"/"} className="cabecalho_logo">
        <img
          className="cabecalho_imagem_logo"
          src={LogoBranca}
          alt="Logo branca da Juntos pela Saúde"
        />
      </Link>

      <nav className="cabecalho_navegacao" aria-label="Menu principal">
        <ul className="cabecalho_lista_navegacao">
          <li className="cabecalho_item_navegacao">
            <Link to={"/"} className="cabecalho_link_navegacao">
              Início
            </Link>
          </li>
          <li className="cabecalho_item_navegacao">
            <Link to={"/agenda"} className="cabecalho_link_navegacao">
              Agenda
            </Link>
          </li>
          <li className="cabecalho_item_navegacao">
            <Link to={"/faq"} className="cabecalho_link_navegacao">
              FAQ
            </Link>
          </li>
          <li className="cabecalho_item_navegacao">
            <Link to={"/contato"} className="cabecalho_link_navegacao">
              Contato
            </Link>
          </li>
        </ul>
      </nav>

      <Link
        to={usuarioLogado ? "/dados-conta" : "/login"}
        className="cabecalho_botao_usuario"
        aria-label={usuarioLogado ? "Acessar dados da conta" : "Fazer login"}
      >
        <img
          className="cabecalho_icone_usuario"
          src={IconUsuario}
          alt="Ícone do usuário"
        />
      </Link>
    </header>
  );
};

export default Cabecalho;
