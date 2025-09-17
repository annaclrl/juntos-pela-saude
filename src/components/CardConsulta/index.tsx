import { Link } from "react-router-dom";
import type { CardConsultaProps } from "../../types/consulta";

const CardConsulta = ({ especialidade, medico, dataHora, status }: CardConsultaProps) => {
  const data = new Date(dataHora);

  const dataHoraFormatada = `${data.toLocaleDateString("pt-BR")} - ${data.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}`;

  return (
    <div className="card_consulta">
      <div className="card_consulta_conteudo">
        <h2>Consulta</h2>
        <p><strong>Especialidade:</strong> {especialidade}</p>
        <p><strong>Médico:</strong> {medico}</p>
        <p><strong>Data e Hora:</strong> {dataHoraFormatada}</p>
        <p><strong>Status:</strong> {status}</p>

        <Link to={'/permissao'} className="card_consulta_botao"> Entrar na consulta</Link>   
      </div>
    </div>
  );
};

export default CardConsulta;
