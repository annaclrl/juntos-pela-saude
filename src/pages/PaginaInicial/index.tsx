import './PaginaInicial.css'
import ImagemPrincipal from '../../assets/images/imagem-pagina-principal.png'
import IconCalendario from '../../assets/icons/icon-calendario.png'
import IconDuvida from '../../assets/icons/icon-duvida.png'
import IconChat from '../../assets/icons/icon-chat.png'
import { Link } from 'react-router-dom'


const PaginaInicial = () =>{
    return(
        <main>
        <section id="secao1">
            <div className="secao1_texto">
                <h1>Boas-Vindas!</h1>
                <p>Sua <span>saúde</span> mais próxima de você.</p>
                <p>Aqui, cuidar da saúde é <span>simples</span> e <span>digital</span>.</p>
            </div>
            <div className="secao1_imagem">
                <img className="imagem-pagina-principal" src={ImagemPrincipal} alt="Representação de uma consulta online" />
            </div>
        </section>
        <section id="secao2">
            <h2>Como funciona?</h2>

            <div className="secao2_icones">
                
                <div className="funcionalidades_pagina_inicial">
                    <img src={IconCalendario} alt="Icone de calendário" />
                    <Link to={"/agendar-consulta"}>Agende sua consulta</Link>
                </div>

                <div className="funcionalidades_pagina_inicial">
                    <img src={IconDuvida} alt="Icone de dúvida" />
                    <Link to={"/faq"}>Tire suas dúvidas</Link>
                </div>

                <div className="funcionalidades_pagina_inicial">
                    <img src={IconChat} alt="Icone de chat" />
                    <Link to={"/contato"}>Dê sua opinião</Link>
                </div>

            </div>
        </section>
    </main>
    );
}

export default PaginaInicial;