import './CardConsulta.css'

export type StatusConsulta = "Confirmada" | "Realizada";

export type CardConsultaProps = {
    especialidade: string;
    medico: string;
    dataHora: string;
    status: StatusConsulta;
}

const CardConsulta = ({ especialidade, medico, dataHora, status }: CardConsultaProps) => {
    return (
        <div className="card_consulta">
            <div className="card_consulta_conteudo_consulta">

                <h2>CONSULTA</h2>
                <p><strong>Especialidade:</strong> {especialidade}</p>
                <p><strong>Nome do médico:</strong> {medico}</p>
                <p><strong>Data e Hora:</strong> {dataHora}</p>
                <p><strong>Status:</strong> {status}</p>

            </div>
        </div>
    )
}

export default CardConsulta;

