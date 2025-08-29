import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './DadosConta.css'

type UsuarioProps = {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
};

const DadosConta = () => {
  const [usuario, setUsuario] = useState<UsuarioProps | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      setUsuario(JSON.parse(usuarioLogado));
    }
  }, []);


  const getUsuarios = (): UsuarioProps[] => {
    const usuariosJSON = localStorage.getItem("usuarios");
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
  };

  const salvarUsuarios = (usuarios: UsuarioProps[]) => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  };


  const handleEditar = () => {
    navigate("/editar-dados");
  };

  const handleExcluir = () => {
    if (!usuario) return;

    if (window.confirm("Tem certeza que deseja excluir essa conta?")) {
      const usuarios = getUsuarios();
      const index = usuarios.findIndex((u) => u.email === usuario.email);

      if (index === -1) {
        alert("Erro ao excluir");
        return;
      }

      usuarios.splice(index, 1);
      salvarUsuarios(usuarios);
      localStorage.removeItem("usuarioLogado");
      navigate("/");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair dessa conta?")) {
      localStorage.removeItem("usuarioLogado");
      navigate("/");
    }
  };

  if (!usuario) return <p>Carregando dados...</p>;

  return (
    <main id="container_pagina_dados_conta">
      <div className="container_pagina_dados_conta_conteudo">
        <div className="container_pagina_dados_conta_conteudo_dados">
          <div className="container_pagina_dados_conta_titulo">
            <h1>Dados da Conta</h1>
            <p>Abaixo estão seus dados cadastrados no sistema</p>
          </div>

          <div className="container_pagina_dados_conta_dados_usuario">
            <p><strong>Nome Completo:</strong> {usuario.nome}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>CPF:</strong> {usuario.cpf}</p>
            <p><strong>Senha:</strong> {"*".repeat(usuario.senha.length)}</p>
          </div>

          <div className="container_pagina_dados_conta_botoes">
            <div className="container_pagina_dados_conta_botao_funcionalidades">
              <button onClick={handleEditar}>Editar</button>
            </div>
            <div className="container_pagina_dados_conta_botao_funcionalidades">
              <button  onClick={handleExcluir}>Excluir</button>
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
 