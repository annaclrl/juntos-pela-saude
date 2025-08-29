import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../../components/CampoFormulario";
import "./EditarDados.css";

type UsuarioProps = {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
};

const EditarDados = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<UsuarioProps>({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [corMensagem, setCorMensagem] = useState<"red" | "green">("green");

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
    const key = e.target.name as keyof UsuarioProps;
    setUsuario({ ...usuario, [key]: e.target.value });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listaUsuarios: UsuarioProps[] =
      JSON.parse(localStorage.getItem("usuarios") || "[]");

    const index = listaUsuarios.findIndex(
      (u) => u.email === JSON.parse(localStorage.getItem("usuarioLogado") || "{}").email
    );

    if (index !== -1) {
      listaUsuarios[index] = usuario;
      localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      setMensagem("Dados atualizados com sucesso!");
      setCorMensagem("green");

      setTimeout(() => navigate("/dados-conta"), 1500);
    } else {
      setMensagem("Erro! Dados não atualizados.");
      setCorMensagem("red");
    }
  };

  return (
    <main id="container_pagina_editar_dados">
      <div className="container_pagina_editar_dados_form_wrapper">

        <form id="container_pagina_editar_dados_form_wrapper" onSubmit={handleSubmit}>

          <div className="container_pagina_editar_dados_titulo">
            <h1>Atualização da Conta</h1>
            <p>Atualize os campos abaixo:</p>
          </div>

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
            placeholder="Digite seu email"
            value={usuario.email}
            onChange={handleChange}
            required
          />

          <CampoFormulario
            id="cpf"
            name="cpf"
            label="CPF"
            placeholder="Digite seu CPF"
            value={usuario.cpf}
            onChange={handleChange}
            required
          />

          <CampoFormulario
            id="senha"
            name="senha"
            label="Senha"
            placeholder="Digite sua senha"
            value={usuario.senha}
            onChange={handleChange}
            required
          />

          {mensagem && (
            <div id="mensagemEditar" style={{ color: corMensagem }}>
              {mensagem}
            </div>
          )}

          <div className="container_pagina_editar_dados_botao">
            <div>
              <button className="container_pagina_editar_dados_botao_atualizar" type="submit">Atualizar</button>
            </div>
          <div></div>
            <button className="container_pagina_editar_dados_botao_cancelar" type="button"  onClick={handleVoltar}> Cancelar</button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default EditarDados;
