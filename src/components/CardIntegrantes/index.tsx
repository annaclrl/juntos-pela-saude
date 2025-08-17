import './CardIntegrantes.css'
import IconLinkedln from '../../assets/icons/icon-linkedln.png'
import IconGithub from '../../assets/icons/icon-github.png'

interface CardIntegrantesProps {
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  alt: string;
  linkedin: string;
  github: string;
}

const CardIntegrantes: React.FC<CardIntegrantesProps> = ({
  nome,
  rm,
  turma,
  foto,
  alt,
  linkedin,
  github,
}) => {

  return (
    <div className="card_integrante">
      <img className="card_integrante_imagem" src={foto} alt={alt} />

      <div className="card_integrante_conteudo">
        <p><strong>Nome:</strong> {nome}</p>
        <p><strong>RM:</strong> {rm}</p>
        <p><strong>Turma:</strong> {turma}</p>

        <nav>
          <a href={linkedin} target="_blank">
            <img src={IconLinkedln} alt="Ícone do LinkedIn" />
          </a>
          <a href={github} target="_blank">
            <img src={IconGithub} alt="Ícone do GitHub" />
          </a>
        </nav>
      </div>
    </div>
  );
};


export default CardIntegrantes;