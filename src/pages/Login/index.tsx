import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Logo from '../../assets/images/logo-completa-azul.png';
import CampoFormulario from "../../components/CampoFormulario";

type LoginUsuarioProps = {
  email: string;
  senha: string;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [corMensagem, setCorMensagem] = useState<"red" | "green">("red");

  function mostrarMensagem(msg: string, cor: "red" | "green") {
    setMensagem(msg);
    setCorMensagem(cor);
  }

  function getUsuarios(): LoginUsuarioProps[] {
    const usuariosJSON = localStorage.getItem("usuarios");
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const usuarios = getUsuarios();
    const usuario = usuarios.find((user) => user.email === email);

    if (!usuario) {
      mostrarMensagem("Email não cadastrado!", "red");
      setEmail("");
      setSenha("");
    } else if (usuario.senha === senha) {
      mostrarMensagem("Login realizado com sucesso!", "green");
      setEmail("");
      setSenha("");

      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      mostrarMensagem("Senha incorreta!", "red");
    }
  }

  return (
    <main id="container_pagina_login">

      <Link to={"/"}>
        <img src={Logo} alt="Logo" />
      </Link>

      <div className="container_pagina_login_form_wrapper">
        <form id="container_pagina_login_form" onSubmit={handleLogin}>
          <div className="container_pagina_login_titulo">
            <h1>Bem-Vindo de volta</h1>
            <p>Entre com sua conta</p>
          </div>

          <CampoFormulario
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />

          <CampoFormulario
            id="senha"
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />

          {mensagem && <div style={{ color: corMensagem }}>{mensagem}</div>}

          <div className="container_pagina_login_botao">
            <button type="submit">Entrar</button>
          </div>

          <p className="container_pagina_login_link">
            Ainda não tem uma conta? <Link to={"/cadastro"}>Cadastre-se aqui</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
