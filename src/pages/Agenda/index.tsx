import { useState, useEffect, type FormEvent } from "react";
import CardConsulta, { type StatusConsulta } from "../../components/CardConsulta";
import Modal from "../../components/ModalAcesso";
import IconBusca from '../../assets/icons/icon-busca.png';
import "./Agenda.css";

type Consulta = {
  id: number;
  especialidade: string;
  medico: string;
  dataHora: string;
  status: StatusConsulta;
  usuarioEmail: string;
};

const Agenda = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<StatusConsulta | "">("");
  const [busca, setBusca] = useState("");
  const [showModal, setShowModal] = useState(false);

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
  const emailUsuario = usuarioLogado?.email;

  useEffect(() => {
    if (!emailUsuario) {
      setShowModal(true);
    } else {
      const stored = localStorage.getItem("consultas");
      if (stored) {
        const todasConsultas: Consulta[] = JSON.parse(stored);
        setConsultas(todasConsultas.filter(c => c.usuarioEmail === emailUsuario));
      }
    }
  }, [emailUsuario]);

  const consultasFiltradas = consultas.filter((consulta) => {
    const statusOk = filtroStatus ? consulta.status === filtroStatus : true;
    const buscaOk = consulta.medico.toLowerCase().includes(busca.toLowerCase());
    return statusOk && buscaOk;
  });

  const handleBusca = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <main className="container_pagina_agenda">
      <Modal
        mostrar={showModal}
        titulo="Atenção"
        mensagem="Você precisa estar logado para acessar a agenda."
        onClose={() => setShowModal(false)}
        acaoOpcional={{ texto: "Ir para Login", onClick: () => window.location.href = "/login" }}
      />

      <h1>Suas consultas</h1>

      <div className="container_pagina_agenda_filtro_busca">
        <select
          id="container_pagina_agenda_filtro"
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

      <div className="container_pagina_agenda_consultas" style={{ opacity: showModal ? 0.3 : 1, pointerEvents: showModal ? "none" : "auto" }}>
        {consultasFiltradas.length > 0 ? (
          consultasFiltradas.map((consulta) => (
            <CardConsulta
              key={consulta.id}
              especialidade={consulta.especialidade}
              medico={consulta.medico}
              dataHora={consulta.dataHora}
              status={consulta.status}
            />
          ))
        ) : (
          <p className="container_pagina_agenda_mensagem">Nenhuma consulta realizada/agenda</p>
        )}
      </div>
    </main>
  );
};

export default Agenda;
