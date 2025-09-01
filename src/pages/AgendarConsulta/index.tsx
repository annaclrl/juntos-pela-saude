import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/ModalAcesso";
import "./AgendarConsulta.css";

interface Consulta {
  especialidade: string;
  medico: string;
  dataHora: string;
  status: string;
  usuarioEmail: string;
}

const AgendarConsulta = () => {
  const [especialidade, setEspecialidade] = useState("");
  const [medico, setMedico] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [usuarioEmail, setUsuarioEmail] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Verifica se usuário está logado
  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "null");
    if (!usuarioLogado) {
      setShowModal(true);
    } else {
      setUsuarioEmail(usuarioLogado.email);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioEmail) return;

    const dataSelecionada = new Date(dataHora);
    const agora = new Date();

    if (dataSelecionada < agora) {
      alert("❌ Não é possível agendar para uma data que já passou.");
      return;
    }

    const novaConsulta: Consulta = {
      especialidade,
      medico,
      dataHora,
      status: "Confirmada",
      usuarioEmail,
    };

    const consultas = JSON.parse(localStorage.getItem("consultas") || "[]");
    consultas.push(novaConsulta);
    localStorage.setItem("consultas", JSON.stringify(consultas));

    navigate("/agenda");
  };

  return (
    <main>
      <Modal
        mostrar={showModal}
        titulo="Atenção"
        mensagem="Você precisa estar logado para agendar uma consulta."
        onClose={() => setShowModal(false)}
        acaoOpcional={{ texto: "Ir para Login", onClick: () => navigate("/login") }}
      />

      <section id="agendar_consulta_container" style={{ opacity: showModal ? 0.3 : 1, pointerEvents: showModal ? "none" : "auto" }}>

        <h1>Agendar Consulta</h1>
        <p>Preencha o formulário abaixo para agendar sua consulta.</p>

        <form className="agendar_consulta_form" onSubmit={handleSubmit}>

          <div className="agendar_consulta_form_campo">
            <label htmlFor="especialidade">Especialidade:</label>
            <select
              id="especialidade"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              required
            >
              <option value="">Selecione</option>
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

          <div className="agendar_consulta_form_campo">
            <label htmlFor="medico">Médico:</label>
            <select
              id="medico"
              value={medico}
              onChange={(e) => setMedico(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="Dr. Felipe">Dr. Felipe</option>
              <option value="Dr. Gabriel">Dr. Gabriel</option>
              <option value="Dra. Ana">Dra. Ana</option>
              <option value="Dr. João">Dr. João</option>
              <option value="Dra. Maria">Dra. Maria</option>
              <option value="Dr. Carlos">Dr. Carlos</option>
              <option value="Dra. Fernanda">Dra. Fernanda</option>
              <option value="Dr. Ricardo">Dr. Ricardo</option>
            </select>
          </div>

          <div className="agendar_consulta_form_campo">
            <label htmlFor="dataHora">Data e Hora:</label>
            <input
              type="datetime-local"
              id="dataHora"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              required
            />
          </div>

          <button id="agendar_consulta_botao" type="submit" disabled={showModal}>
            Agendar
          </button>
        </form>

        <div className="agendar-consulta_informacoes">
          <h2>Informações Adicionais</h2>
          <p>Após o agendamento, você receberá um e-mail de confirmação com todos os detalhes da sua consulta.</p>
          <p>Se precisar de ajuda, entre em <a href="/contato">contato</a>.</p>
        </div>
      </section>
    </main>
  );
};

export default AgendarConsulta;
