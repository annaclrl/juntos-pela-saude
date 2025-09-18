export type StatusConsulta = "Confirmada" | "Realizada";

export interface Consulta {
  id: number;
  especialidade: string;
  medico: string;
  dataHora: string;
  status: StatusConsulta;
  usuarioEmail: string;
}

export interface CardConsultaProps extends Omit<Consulta, "usuarioEmail">{
  onAtualizarStatus?: (id: number, novoStatus: StatusConsulta) => void;
  onEntrar?: (id: number) => void;
}

