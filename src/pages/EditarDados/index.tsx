import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../../components/CampoFormulario";
import "./EditarDados.css";
import type { Usuario } from "../../types/usuario";

const EditarDados = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [corMensagem, setCorMensagem] = useState<"red" | "green">("green");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    }
  }, []);

  const handleVoltar = () => {
    navigate("/dados-conta");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.target.name as keyof Usuario;
    setUsuario({ ...usuario, [key]: e.target.value });

    if (mensagem) {
      setMensagem("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cpfNumeros = usuario.cpf.replace(/\D/g, "");
    if (cpfNumeros.length !== 11) {
      setMensagem("Por favor, informe um CPF válido com 11 dígitos.");
      setCorMensagem("red");
      setIsSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const listaUsuarios: Usuario[] =
      JSON.parse(localStorage.getItem("usuarios") || "[]");

    const usuarioAntigo = JSON.parse(
      localStorage.getItem("usuarioLogado") || "null"
    );

    if (!usuarioAntigo) {
      setMensagem("Usuário logado não encontrado.");
      setCorMensagem("red");
      setIsSubmitting(false);
      return;
    }

    const index = listaUsuarios.findIndex((u) => u.email === usuarioAntigo.email);

    if (index !== -1) {
      const usuarioAtualizado = {
        ...usuario,
        email: usuarioAntigo.email, 
      };

      listaUsuarios[index] = usuarioAtualizado;
      localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));

      setMensagem("Dados atualizados com sucesso!");
      setCorMensagem("green");

      setTimeout(() => navigate("/dados-conta"), 1500);
    } else {
      setMensagem("Erro! Usuário não encontrado.");
      setCorMensagem("red");
    }

    setIsSubmitting(false);
  };

  return (
    <main id="container_pagina_editar_dados">
      <div className="container_pagina_editar_dados_form_wrapper">
        <form id="container_pagina_editar_dados_form" onSubmit={handleSubmit}>
          <div className="container_pagina_editar_dados_titulo">
            <h1>Atualização da Conta</h1>
            <p>Atualize seus dados pessoais abaixo</p>
          </div>

          <div className="form-fields">
              <CampoFormulario
                id="nome"
                name="nome"
                label="Nome Completo"
                placeholder="Digite seu nome completo"
                value={usuario.nome}
                onChange={handleChange}
                required
              />

            <CampoFormulario
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={usuario.email}
              onChange={handleChange}
              required
              disabled={true} 
              title="O email não pode ser alterado por questões de segurança"
            />

            <CampoFormulario
              id="cpf"
              name="cpf"
              label="CPF"
              placeholder="000.000.000-00"
              value={usuario.cpf}
              onChange={handleChange} 
              required
            />

            <CampoFormulario
              id="senha"
              name="senha"
              label="Senha"
              type="password"
              placeholder="Digite sua nova senha"
              value={usuario.senha}
              onChange={handleChange}
              required
            />
          </div>

          {mensagem && (
            <div className={`mensagem-editar ${corMensagem}`}>{mensagem}</div>
          )}

          <div className="container_pagina_editar_dados_botoes">
            <button
              className="container_pagina_editar_dados_botao_atualizar"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Atualizando..." : "Atualizar Dados"}
            </button>

            <button
              className="container_pagina_editar_dados_botao_cancelar"
              type="button"
              onClick={handleVoltar}
              disabled={isSubmitting}
            >
              Voltar
            </button>
          </div>

          <div className="security-notice">
            <p>Seus dados são protegidos conforme as normas de segurança</p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditarDados;
