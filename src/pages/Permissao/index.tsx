import ImgPermissoes from '../../assets/images/microfone-camera.jpg';
import { Link } from 'react-router-dom';

const Permissao = () => {

  return (
    <main>
      <div className="container_pagina_permissao">
        <div className="container_pagina_permissao_conteudo">
            <img
              src={ImgPermissoes}
              alt="ícone do microfone e da câmera"
              className="container_pagina_permissao_conteudo_img"
            />
          <h1 className="container_pagina_permissao_conteudo_titulo">Permissões Necessárias</h1>
      
          <div className="container_pagina_permissao_conteudo_steps">
            <div className="container_pagina_permissao_conteudo_step">
              <span className="step_numero">1</span>
              <div className="step_conteudo">
                <h3>Câmera</h3>
                <p>Permita o acesso à sua câmera para que possamos vê-lo durante a consulta</p>
              </div>
            </div>
      
            <div className="container_pagina_permissao_conteudo_step">
              <span className="step_numero">2</span>
              <div className="step_conteudo">
                <h3>Microfone</h3>
                <p>Permita o acesso ao microfone para que possamos ouvi-lo claramente</p>
              </div>
            </div>
      
            <div className="container_pagina_permissao_conteudo_step">
              <span className="step_numero">3</span>
              <div className="step_conteudo">
                <h3>Acesso Rápido</h3>
                <p>Clique em "Permitir" quando seu navegador solicitar as permissões</p>
              </div>
            </div>
          </div>
          <Link to='/sala-espera' className="container_pagina_permissao_conteudo_botao">Ir para sala de espera</Link>
          <p className="container_pagina_permissao_conteudo_texto">
            Sua privacidade é importante. As permissões são usadas apenas para a consulta e não são gravadas.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Permissao;
