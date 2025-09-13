import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from '../../assets/images/logo-completa-azul.png';
import CampoFormulario from "../../components/CampoFormulario";
import type { UsuarioLogin } from "../../types/usuario";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [corMensagem, setCorMensagem] = useState<"red" | "green">("red");
  const [isLoading, setIsLoading] = useState(false);

  function mostrarMensagem(msg: string, cor: "red" | "green") {
    setMensagem(msg);
    setCorMensagem(cor);
  }

  function getUsuarios(): UsuarioLogin[] {
    const usuariosJSON = localStorage.getItem("usuarios");
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

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
        navigate('/');
      }, 2000);
    } else {
      mostrarMensagem("Senha incorreta!", "red");
    }
    
    setIsLoading(false);
  }

  return (
    <main id="container_pagina_login">
      <Link to={"/"} className="logo-link">
        <img src={Logo} alt="Logo HealthConnect" />
      </Link>

      <div className="container_pagina_login_form_wrapper">
        <form id="container_pagina_login_form" onSubmit={handleLogin}>
          <div className="container_pagina_login_titulo">
            <h1>Bem-Vindo de volta</h1>
            <p>Entre com sua conta</p>
          </div>

          <div className="form-fields">
            <CampoFormulario
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />

            <CampoFormulario
              id="senha"
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {mensagem && (
            <div className={`mensagem-login ${corMensagem}`}>
              {mensagem}
            </div>
          )}

          <div className="container_pagina_login_botao">
            <button 
              type="submit" 
              disabled={isLoading}
              className={isLoading ? 'loading' : ''}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
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