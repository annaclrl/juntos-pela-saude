import React, { useState } from "react";
import Logo from "../../assets/images/logo-completa-azul.png";
import { Link, useNavigate } from "react-router-dom";
import CampoFormulario from "../../components/CampoFormulario";
import type { Usuario } from "../../types/usuario";

const Cadastro = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [corMensagem, setCorMensagem] = useState<"red" | "green">("red");
  const [isLoading, setIsLoading] = useState(false);

  function mostrarMensagem(msg: string, cor: "red" | "green") {
    setMensagem(msg);
    setCorMensagem(cor);
  }

  function validarCPF(cpf: string): boolean {
    const cpfNumerico = cpf.replace(/\D/g, "");
    return cpfNumerico.length === 11;
  }

  function getUsuarios(): Usuario[] {
    const usuariosJSON = localStorage.getItem("usuarios");
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
  }

  function salvarUsuarios(usuarios: Usuario[]) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!nome || !email || !cpf || !senha || !confirmaSenha) {
      mostrarMensagem("Por favor, preencha todos os campos.", "red");
      setIsLoading(false);
      return;
    }

    if (!validarCPF(cpf)) {
      mostrarMensagem(
        "CPF inválido. Deve conter exatamente 11 dígitos numéricos.",
        "red"
      );
      setIsLoading(false);
      return;
    }

    const usuarios = getUsuarios();
    const existeEmail = usuarios.some((user) => user.email === email);
    const existeCPF = usuarios.some((user) => user.cpf === cpf);

    if (existeEmail) {
      mostrarMensagem("Email já cadastrado!", "red");
      setIsLoading(false);
      return;
    }

    if (existeCPF) {
      mostrarMensagem("CPF já cadastrado!", "red");
      setIsLoading(false);
      return;
    }

    if (senha !== confirmaSenha) {
      mostrarMensagem("As senhas não coincidem. Por favor, verifique.", "red");
      setIsLoading(false);
      return;
    }

    const novoUsuario: Usuario = { nome, email, cpf, senha };
    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);

    mostrarMensagem("Cadastro realizado com sucesso!", "green");

    setNome("");
    setEmail("");
    setCpf("");
    setSenha("");
    setConfirmaSenha("");

    setTimeout(() => {
      navigate('/login');
    }, 1500);
    
    setIsLoading(false);
  }

  return (
    <main id="container_pagina_cadastro">
      <Link to={"/"} className="logo-link">
        <img src={Logo} alt="Logo HealthConnect" />
      </Link>

      <div className="container_pagina_cadastro_form_wrapper">
        <form id="container_pagina_cadastro_form" onSubmit={handleCadastro}>
          <div className="container_pagina_cadastro_titulo">
            <h1>Bem-Vindo à Juntos pela Saúde</h1>
            <p>Cadastre-se para acessar o painel de gestão</p>
          </div>

          <div className="form-fields">
            <CampoFormulario
              id="nome"
              name="nome"
              label="Nome Completo"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome completo"
              required
            />

            <CampoFormulario
              id="email"
              name="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />

            <CampoFormulario
              id="cpf"
              name="cpf"
              label="CPF"
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF"
              required
            />

            <CampoFormulario
              id="senha"
              name="senha"
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />

            <CampoFormulario
              id="confirmaSenha"
              name="confirmaSenha"
              label="Confirmar Senha"
              type="password"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
              placeholder="Confirme sua senha"
              required
            />
          </div>

          {mensagem && (
            <div className={`mensagem-cadastro ${corMensagem}`}>
              {mensagem}
            </div>
          )}

          <div className="container_pagina_cadastro_botao">
            <button 
              type="submit" 
              disabled={isLoading}
              className={isLoading ? 'loading' : ''}
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>

          <p className="container_pagina_cadastro_link">
            Já tem uma conta? <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Cadastro;