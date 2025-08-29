// src/pages/Agenda.tsx
import { useState, useEffect, type FormEvent } from "react";
import CardConsulta, { type StatusConsulta } from "../../components/CardConsulta";
import IconBusca from '../../assets/icons/icon-busca.png'
import "./Agenda.css";

type Consulta = {
  id: number;
  especialidade: string;
  medico: string;
  dataHora: string;
  status: StatusConsulta;
  link?: string;
};

const Agenda = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<StatusConsulta | "">("");
  const [busca, setBusca] = useState("");

  // carregar consultas do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("consultas");
    if (stored) {
      setConsultas(JSON.parse(stored));
    } else {
      // se não tiver nada, cria dados de exemplo
      const exemplo: Consulta[] = [
        {
          id: 1,
          especialidade: "Fisioterapia",
          medico: "Felipe",
          dataHora: "10/04/2025 - 18h",
          status: "Realizada",
        },
        {
          id: 2,
          especialidade: "Fisioterapia",
          medico: "Gabriel",
          dataHora: "15/05/2025 - 16h",
          status: "Confirmada",
          link: "#",
        },
      ];
      setConsultas(exemplo);
      localStorage.setItem("consultas", JSON.stringify(exemplo));
    }
  }, []);

  // filtrar e buscar
  const consultasFiltradas = consultas.filter((consulta) => {
    const statusOk = filtroStatus ? consulta.status === filtroStatus : true;
    const buscaOk = consulta.medico.toLowerCase().includes(busca.toLowerCase());
    return statusOk && buscaOk;
  });

  const handleBusca = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
  };

  return (
    <main className="container_pagina_agenda">

      <h1>Suas consultas</h1>

      <div className="container_pagina_agenda_filtro_busca">
        <select id="container_pagina_agenda_filtro"
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value as StatusConsulta | "")}
        >
          <option value="">Filtro</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Realizada">Realizada</option>
        </select>

        <form className="container_pagina_agenda_busca" onSubmit={handleBusca}>
          <input
            type="text"
            placeholder="Buscar por médico"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button type="submit">
            <img src={IconBusca} alt="ícone de busca " />
          </button>
        </form>
      </div>

      <div className="container_pagina_agenda_consultas">
        {consultasFiltradas.map((consulta) => (
          <CardConsulta
            key={consulta.id}
            especialidade={consulta.especialidade}
            medico={consulta.medico}
            dataHora={consulta.dataHora}
            status={consulta.status}
          />
        ))}
      </div>
    </main>
  );
};

export default Agenda;
