export type StatusConsulta = "Confirmada" | "Realizada";

export interface Consulta {
  id: number;
  especialidade: string;
  medico: string;
  dataHora: string;
  status: StatusConsulta;
  usuarioEmail: string;
}

export interface CardConsultaProps {
  especialidade: string;
  medico: string;
  dataHora: string;
  status: StatusConsulta;
  onAtualizarStatus?: (id: number, novoStatus: StatusConsulta) => void;
}

