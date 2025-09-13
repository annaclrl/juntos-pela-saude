import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './DadosConta.css'
import type { Usuario } from "../../types/usuario";

const DadosConta = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [feedback, setFeedback] = useState<{ texto: string; cor: "red" | "green" } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    }
  }, []);

  const getUsuarios = (): Usuario[] => {
    const usuariosJSON = localStorage.getItem("usuarios");
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
  };

  const salvarUsuarios = (usuarios: Usuario[]) => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  };

  const handleEditar = () => {
    navigate("/editar-dados");
  };

  const handleExcluir = () => {
    if (!usuario) return;

    if (window.confirm("Tem certeza que deseja excluir essa conta?")) {
      const usuarios = getUsuarios();
      const novosUsuarios = usuarios.filter(u => u.email !== usuario.email);
      salvarUsuarios(novosUsuarios);
      localStorage.removeItem("usuarioLogado");
      setFeedback({ texto: "Conta excluída com sucesso!", cor: "green" });

      setTimeout(() => navigate("/"), 1500);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair dessa conta?")) {
      localStorage.removeItem("usuarioLogado");
      setFeedback({ texto: "Logout realizado com sucesso!", cor: "green" });
      setTimeout(() => navigate("/"), 1000);
    }
  };


  if (!usuario) {
    return (
      <main id="container_pagina_dados_conta">
        <div className="error-container">
          <p>Carregando dados...</p>
        </div>
      </main>
    );
  }

  return (
    <main id="container_pagina_dados_conta">
      <div className="container_pagina_dados_conta_conteudo">
        <div className="container_pagina_dados_conta_conteudo_dados">
          <div className="container_pagina_dados_conta_titulo">
            <h1>Dados da Conta</h1>
            <p>Abaixo estão seus dados cadastrados no sistema</p>
          </div>

          <div className="container_pagina_dados_conta_dados_usuario">
            <div className="dados-item">
              <p><strong>Nome Completo:</strong> {usuario.nome}</p>
            </div>
            <div className="dados-item">
              <p><strong>Email:</strong> {usuario.email}</p>
            </div>
            <div className="dados-item">
              <p><strong>CPF:</strong> {usuario.cpf}</p>
            </div>
            <div className="dados-item">
              <p><strong>Senha:</strong> {"*".repeat(usuario.senha.length)}</p>
            </div>
          </div>

          {feedback && (
            <div className={`feedback-message ${feedback.cor}`}>
              {feedback.texto}
            </div>
          )}

          <div className="container_pagina_dados_conta_botoes">
            <div className="container_pagina_dados_conta_botao_funcionalidades">
              <button onClick={handleEditar}>Editar</button>
            </div>
            <div className="container_pagina_dados_conta_botao_funcionalidades">
              <button onClick={handleExcluir}>Excluir</button>
            </div>
            <div className="container_pagina_dados_conta_botao_funcionalidades">
              <button onClick={handleLogout}>Sair</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DadosConta;