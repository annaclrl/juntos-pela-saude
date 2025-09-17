import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/ModalAcesso";
import type { Consulta } from "../../types/consulta";


const AgendarConsulta = () => {
  const [especialidade, setEspecialidade] = useState("");
  const [medico, setMedico] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [usuarioEmail, setUsuarioEmail] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const medicosPorEspecialidade: Record<string, string[]> = {
    "Fisioterapia": ["Dr. Felipe Silva", "Dr. Carlos Almeida"],
    "Pediatria": ["Dr. Gabriel Oliveira", "Dra. Ana Costa"],
    "Dermatologia": ["Dra. Maria Rodrigues", "Dr. João Santos"],
    "Cardiologia": ["Dr. Ricardo Pereira", "Dr. Carlos Almeida"],
    "Oftalmologia": ["Dra. Fernanda Lima", "Dr. João Santos"],
    "Ginecologia": ["Dra. Ana Costa", "Dra. Maria Rodrigues"],
    "Ortopedia": ["Dr. Felipe Silva", "Dr. Ricardo Pereira"],
    "Neurologia": ["Dr. Gabriel Oliveira", "Dra. Fernanda Lima"]
  };

  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
    if (!usuarioLogado) {
      setShowModal(true);
    } else {
      setUsuarioEmail(usuarioLogado.email);
    }
  }, []);

  const formatarData = (data: string) => {
    if (!data) return "";
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const isDataValida = useMemo(() => {
    if (!dataHora) return false;
    const dataSelecionada = new Date(dataHora);
    return dataSelecionada >= new Date();
  }, [dataHora]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioEmail || !isDataValida) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    
    const consultas = JSON.parse(localStorage.getItem("consultas") || "[]");


    const novoId = consultas.length > 0 ? Math.max(...consultas.map((c: any) => c.id)) + 1 : 1;

    const novaConsulta: Consulta = {
      id: novoId, 
      especialidade,
      medico,
      dataHora,
      status: "Confirmada",
      usuarioEmail
    };

    consultas.push(novaConsulta);
    localStorage.setItem("consultas", JSON.stringify(consultas));

    setIsSubmitting(false);

    navigate("/agenda", {
      state: { message: "Consulta agendada com sucesso! ✅", showConfetti: true }
    });
  };


  const medicosDisponiveis = especialidade ? medicosPorEspecialidade[especialidade] || [] : [];

  return (
    <main className="agendar-consulta-main">
      <Modal
        mostrar={showModal}
        titulo="Atenção"
        mensagem="Você precisa estar logado para agendar uma consulta."
        onClose={() => setShowModal(false)}
        acaoOpcional={{ texto: "Ir para Login", onClick: () => navigate("/login") }}
      />

      <section
        id="agendar_consulta_container"
        className={showModal ? 'disabled' : ''}
        aria-hidden={showModal}
      >
        <div className="agendar_consulta_header">
          <h1>Agendar Consulta</h1>
          <p className="agendar_consulta_subtitle">
            Preencha o formulário abaixo para agendar sua consulta online
          </p>
        </div>

        <div className="agendar_consulta_conteudo">
          <form className="agendar_consulta_form" onSubmit={handleSubmit}>
            <div className="form_step">
              <div className="step_header">
                <span className="step_numero">1</span>
                <h3>Informações da Consulta</h3>
              </div>

              <div className="agendar_consulta_form_campo">
                <label htmlFor="especialidade">
                  <span className="label_icon"></span>
                  Especialidade Médica
                </label>
                <select
                  id="especialidade"
                  value={especialidade}
                  onChange={(e) => setEspecialidade(e.target.value)}
                  required
                  className={especialidade ? "has-value" : ""}
                >
                  <option value="">Selecione uma especialidade</option>
                  <option value="Fisioterapia">Fisioterapia</option>
                  <option value="Pediatria">Pediatria</option>
                  <option value="Dermatologia">Dermatologia</option>
                  <option value="Cardiologia">Cardiologia</option>
                  <option value="Oftalmologia">Oftalmologia</option>
                  <option value="Ginecologia">Ginecologia</option>
                  <option value="Ortopedia">Ortopedia</option>
                  <option value="Neurologia">Neurologia</option>
                </select>
              </div>

              {especialidade && (
                <div className="agendar_consulta_form_campo">
                  <label htmlFor="medico">
                    <span className="label_icon"></span>
                    Médico
                  </label>
                  <select
                    id="medico"
                    value={medico}
                    onChange={(e) => setMedico(e.target.value)}
                    required
                    className={medico ? 'has-value' : ''}
                  >
                    <option value="">Selecione um médico</option>
                    {medicosDisponiveis.map((med) => (
                      <option key={med} value={med}>
                        {med}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {medico && (
                <div className="agendar_consulta_form_campo">
                  <label htmlFor="dataHora">
                    <span className="label_icon"></span>
                    Data e Horário
                  </label>
                  <input
                    type="datetime-local"
                    id="dataHora"
                    value={dataHora}
                    onChange={(e) => setDataHora(e.target.value)}
                    required
                    className={dataHora ? 'has-value' : ''}
                  />
                  {dataHora && (
                    <span className="selecionar_data">
                      Selecionado: {formatarData(dataHora)}
                    </span>
                  )}
                  {dataHora && !isDataValida &&
                    <span className="data_invalida">
                      Data inválida!
                    </span>}
                </div>
              )}
            </div>

            <div className="form_enviar">
              <button
                id="agendar_consulta_botao"
                type="submit"
                disabled={showModal || isSubmitting || !especialidade || !medico || !dataHora}
                className={isSubmitting ? 'submitting' : ''}
              >
                {isSubmitting ? (
                  <>
                    <span className="agendar_consulta_loading"></span>
                    Agendando...
                  </>
                ) : (
                  <>
                    <span></span>
                    Confirmar Agendamento
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="agendar_consulta_informacoes">
            <div className="info_header">
              <span className="info-icon"></span>
              <h2>Informações Importantes</h2>
            </div>
            <div className="info_conteudo">
              <div className="info_item">
                <span className="item_icon"></span>
                <p>Você receberá um e-mail de confirmação com todos os detalhes</p>
              </div>
              <div className="info_item">
                <span className="item_icon"></span>
                <p>Chegue 10 minutos antes do horário agendado</p>
              </div>
              <div className="info_item">
                <span className="item_icon"></span>
                <p>Tenha seus documentos e exames em mãos</p>
              </div>
              <div className="info_item">
                <span className="item_icon"></span>
                <p>Teste sua conexão antes da consulta</p>
              </div>
            </div>
            <div className="info_footer">
              <p>Precisa de ajuda? <a href="/contato">Entre em contato conosco</a></p>
            </div>
          </div>
        </div>

        <div className="agendar_consulta_progresso">
          <div className={`progresso_step ${especialidade ? 'completed' : 'active'}`}>
            <span className="step_numero">1</span>
            <span className="step_label">Especialidade</span>
          </div>
          <div className={`progresso_step ${medico ? 'completed' : especialidade ? 'active' : ''}`}>
            <span className="step_numero">2</span>
            <span className="step_label">Médico</span>
          </div>
          <div className={`progresso_step ${dataHora ? 'completed' : medico ? 'active' : ''}`}>
            <span className="step_numero">3</span>
            <span className="step_label">Data/Hora</span>
          </div>
          <div className={`progresso_step ${dataHora ? 'active' : ''}`}>
            <span className="step_numero">4</span>
            <span className="step_label">Confirmação</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AgendarConsulta;