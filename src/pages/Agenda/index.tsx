import { useState, useEffect, type FormEvent } from "react";
import CardConsulta, { type StatusConsulta } from "../../components/CardConsulta";
import Modal from "../../components/ModalAcesso";
import IconBusca from '../../assets/icons/icon-busca.png';
import IconFiltro from '../../assets/icons/icon-seta.png';
import IconAgendaVazia from '../../assets/icons/icon-calendario.png';
import "./Agenda.css";
import { Link } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(true);
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const atualizarStatusConsulta = (id: number, novoStatus: StatusConsulta) => {
    setConsultas(prevConsultas => {
      const atualizadas = prevConsultas.map(c =>
        c.id === id ? { ...c, status: novoStatus } : c
      );

      const todasConsultas = JSON.parse(localStorage.getItem("consultas") || "[]");
      const atualizadasGlobal = todasConsultas.map((c: Consulta) =>
        c.id === id && c.usuarioEmail === emailUsuario
          ? { ...c, status: novoStatus }
          : c
      );

      localStorage.setItem("consultas", JSON.stringify(atualizadasGlobal));
      return atualizadas;
    });
  };

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
  const emailUsuario = usuarioLogado?.email ?? "";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    
    if (!emailUsuario) {
      setShowModal(true);
      setIsLoading(false);
    } else {
      setTimeout(() => {
        const stored = localStorage.getItem("consultas");
        if (stored) {
          const todasConsultas: Consulta[] = JSON.parse(stored);
          setConsultas(todasConsultas.filter(c => c.usuarioEmail === emailUsuario));
        }
        setIsLoading(false);
      }, 800);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [emailUsuario]);

  const consultasFiltradas = consultas.filter((consulta) => {
    const statusOk = filtroStatus ? consulta.status === filtroStatus : true;
    const buscaOk = consulta.medico.toLowerCase().includes(busca.toLowerCase()) || 
                   consulta.especialidade.toLowerCase().includes(busca.toLowerCase());
    return statusOk && buscaOk;
  });

  const handleBusca = (e: FormEvent<HTMLFormElement>) => e.preventDefault();
  
  const limparFiltros = () => {
    setFiltroStatus("");
    setBusca("");
  };

  const getStatusCount = (status: StatusConsulta) => {
    return consultas.filter(c => c.status === status).length;
  };

  return (
    <main className="container_pagina_agenda">
      <Modal
        mostrar={showModal}
        titulo="Atenção"
        mensagem="Você precisa estar logado para acessar a agenda."
        onClose={() => setShowModal(false)}
        acaoOpcional={{ texto: "Ir para Login", onClick: () => window.location.href = "/login" }}
      />

      <div className="agenda-header">
        <h1>Suas consultas</h1>
        <p>Acompanhe e gerencie suas consultas agendadas</p>
      </div>

      <div className="container_pagina_agenda_filtro_busca">
        {!isMobile && (
          <div className="filtro-toggle" onClick={() => setFiltroAberto(!filtroAberto)}>
            <img src={IconFiltro} alt="Filtrar consultas" />
            <span>Filtros</span>
            {(filtroStatus || busca) && (
              <span className="filtro-badge">
                {(filtroStatus ? 1 : 0) + (busca ? 1 : 0)}
              </span>
            )}
          </div>
        )}
        
        <form className="container_pagina_agenda_busca" onSubmit={handleBusca}>
          <input
            type="text"
            placeholder={isMobile ? "Buscar..." : "Buscar por médico ou especialidade"}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button type="submit" aria-label="Buscar">
            <img src={IconBusca} alt="Ícone de busca" />
          </button>
        </form>

        {isMobile && (
          <div className="filtro-toggle-mobile" onClick={() => setFiltroAberto(!filtroAberto)}>
            <img src={IconFiltro} alt="Filtrar consultas" />
            {(filtroStatus || busca) && (
              <span className="filtro-badge">{filtroStatus ? 1 : 0 + (busca ? 1 : 0)}</span>
            )}
          </div>
        )}
      </div>

      {filtroAberto && (
        <div className="filtro-opcoes">
          <div className="filtro-status">
            <h3>Status da consulta</h3>
            <div className="status-buttons">
              <button 
                className={filtroStatus === "" ? "ativo" : ""}
                onClick={() => setFiltroStatus("")}
              >
                Todas ({consultas.length})
              </button>
              <button 
                className={filtroStatus === "Confirmada" ? "ativo" : ""}
                onClick={() => setFiltroStatus("Confirmada")}
              >
                Confirmadas ({getStatusCount("Confirmada")})
              </button>
              <button 
                className={filtroStatus === "Realizada" ? "ativo" : ""}
                onClick={() => setFiltroStatus("Realizada")}
              >
                Realizadas ({getStatusCount("Realizada")})
              </button>
            </div>
          </div>
          
          {(filtroStatus || busca) && (
            <button className="limpar-filtros" onClick={limparFiltros}>
              Limpar filtros
            </button>
          )}
        </div>
      )}

      <div className="container_pagina_agenda_consultas" style={{ opacity: showModal ? 0.3 : 1, pointerEvents: showModal ? "none" : "auto" }}>
        {isLoading ? (
          <div className="conatiner_loading">
            <div className="loading"></div>
            <p>Carregando suas consultas...</p>
          </div>
        ) : consultasFiltradas.length > 0 ? (
          <>
            <div className="consultas-header">
              <p>{consultasFiltradas.length} consulta{consultasFiltradas.length !== 1 ? 's' : ''} encontrada{consultasFiltradas.length !== 1 ? 's' : ''}</p>
              {(filtroStatus || busca) && (
                <button className="limpar-filtros-mobile" onClick={limparFiltros}>
                  Limpar filtros
                </button>
              )}
            </div>
            
            <div className="container_card_consulta">
              {consultasFiltradas.map((consulta) => (
                <CardConsulta
                  key={consulta.id}
                  especialidade={consulta.especialidade}
                  medico={consulta.medico}
                  dataHora={consulta.dataHora}
                  status={consulta.status}
                  onAtualizarStatus={atualizarStatusConsulta}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="container_agenda_vazia">
            <img src={IconAgendaVazia} alt="Agenda vazia" />
            <h2>Nenhuma consulta encontrada</h2>
            <p>
              {consultas.length === 0 
                ? "Você ainda não possui consultas agendadas." 
                : "Nenhuma consulta corresponde aos filtros aplicados."
              }
            </p>
            {(filtroStatus || busca) && consultas.length > 0 ? (
              <button className="botao_filtros" onClick={limparFiltros}>
                Limpar filtros
              </button>
            ) : (
              <Link to={'/agendar-consulta'} className="botao_consulta" > Agendar primeira consulta </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Agenda;