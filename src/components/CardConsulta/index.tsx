import { useNavigate } from 'react-router-dom';
import './CardConsulta.css'

export type StatusConsulta = "Confirmada" | "Realizada";

export type CardConsultaProps = {
    especialidade: string;
    medico: string;
    dataHora: string;
    status: StatusConsulta;
}

const CardConsulta = ({ especialidade, medico, dataHora, status }: CardConsultaProps) => {
    const navigate = useNavigate(); // <-- useNavigate
    const data = new Date(dataHora);

    const dataFormatada = data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const horaFormatada =
        data.getMinutes() === 0
            ? `${data.getHours()}h`
            : `${data.getHours()}h${data.getMinutes().toString().padStart(2, "0")}`;

    const dataHoraFormatada = `${dataFormatada} - ${horaFormatada}`;

    const handleEntrarConsulta = () => {
        navigate("/permissao"); 
    };

    return (
        <div className="card_consulta">
            <div className="card_consulta_conteudo_consulta">
                <h2>CONSULTA</h2>
                <p><strong>Especialidade:</strong> {especialidade}</p>
                <p><strong>Nome do médico:</strong> {medico}</p>
                <p><strong>Data e Hora:</strong> {dataHoraFormatada}</p>
                <p><strong>Status:</strong> {status}</p>

                {status === "Confirmada" && (
                    <button className="card_consulta_botao" onClick={handleEntrarConsulta}>
                        Entrar na consulta
                    </button>
                )}
            </div>
        </div>
    )
}

export default CardConsulta;
