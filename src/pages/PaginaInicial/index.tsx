import ImagemPrincipal from '../../assets/images/imagem-pagina-principal.png'
import IconCalendario from '../../assets/icons/icon-calendario.png'
import IconDuvida from '../../assets/icons/icon-duvida.png'
import IconChat from '../../assets/icons/icon-chat.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const PaginaInicial = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return(
    <main id="container_pagina_inicial">
      <section id="container_pagina_inicial_secao_apresentacao" className={loaded ? 'loaded' : ''}>
       <div className="container_pagina_inicial_secao_apresentacao_texto">
                <h1>Boas-Vindas!</h1>
                <p>Sua <span>saúde</span> mais próxima de você.</p>
                <p>Aqui, cuidar da saúde é <span>simples</span> e <span>digital</span>.</p>
            </div>
            <div className="container_pagina_inicial_secao_apresentacao_imagem">
                <img className="imagem_pagina_principal" src={ImagemPrincipal} alt="Representação de uma consulta online" />
            </div>
      </section>
      
      <section id="container_pagina_inicial_secao_funcionalidades" className={loaded ? 'loaded' : ''}>
        <h2>Como funciona?</h2>

        <div className="container_pagina_inicial_secao_funcionalidades_cards">
          <div className="funcionalidade_card">
            <div className="icon_container">
              <img src={IconCalendario} alt="Ícone de calendário" aria-hidden="true" />
            </div>
            <h3>Agendamento</h3>
            <p>Marque sua consulta de forma rápida e sem complicações</p>
            <Link to="/agendar-consulta" className="card_link">
              <span className="card_botao">Agende sua consulta →</span>
            </Link>
          </div>

          <div className="funcionalidade_card">
            <div className="icon_container">
              <img src={IconDuvida} alt="Ícone de interrogação representando dúvidas" aria-hidden="true" />
            </div>
            <h3>Tire suas Dúvidas</h3>
            <p>Encontre respostas para as perguntas mais frequentes</p>
            <Link to="/faq" className="card_link">
              <span className="card_botao">Ver perguntas frequentes →</span>
            </Link>
          </div>

          <div className="funcionalidade_card">
            <div className="icon_container">
              <img src={IconChat} alt="Ícone de balão de conversa" aria-hidden="true" />
            </div>
            <h3>Fale Conosco</h3>
            <p>Sua opinião é importante para melhorarmos nossos serviços</p>
            <Link to="/contato" className="card_link">
              <span className="card_botao"> Deixe sua opinião →</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PaginaInicial;