import "./ModalAcesso.css";
import IconFechar from '../../assets/icons/icon-fechar.png';

type ModalProps = {
  mostrar: boolean;
  titulo?: string;
  mensagem: string;
  onClose: () => void;
  acaoOpcional?: {
    texto: string;
    onClick: () => void;
  };
};

const Modal = ({ mostrar, titulo, mensagem, onClose, acaoOpcional }: ModalProps) => {
  if (!mostrar) return null;

  return (
    <div className="modal_overlay_acesso">
      <div className="modal_conteudo_acesso">

        <div className="modal_conteudo_acesso_cabecalho">
          {titulo && <h2>{titulo}</h2>}
                    <button onClick={onClose}>
              <img src={IconFechar} alt="Icone de x" />
            </button>
          <p>{mensagem}</p>
        </div>
        
        <hr />

        <div className="modal_acesso_botao">
          {acaoOpcional && (
            <button className="modal_acesso_botao_login" onClick={acaoOpcional.onClick}>{acaoOpcional.texto}</button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Modal;
