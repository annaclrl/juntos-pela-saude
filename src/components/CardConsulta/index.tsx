import type { CardConsultaProps } from "../../types/consulta";

const CardConsulta = ({ id, especialidade, medico, dataHora, status, onEntrar, onAtualizarStatus }: CardConsultaProps) => {
  
  const handleEntrar = () =>{
    if(onEntrar){
      onEntrar(id);
    }
    if(onAtualizarStatus){
    onAtualizarStatus(id, "Realizada");
    }
  }
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

         {status === "Confirmada" && onEntrar && (
          <button className="card_consulta_botao" onClick={handleEntrar}>
            Entrar na consulta
          </button>
        )}  
      </div>
    </div>
  );
};

export default CardConsulta;
