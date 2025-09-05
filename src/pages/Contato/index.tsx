import CampoFormulario from '../../components/CampoFormulario';
import IconTelefone from '../../assets/icons/icon-telefone.png';
import IconEmail from '../../assets/icons/icon-email.png';
import IconSuporte from '../../assets/icons/icon-suporte.png';
import './Contato.css'

const Contato = () => {
    return (
        <main id="container_pagina_contato">

            <section id="container_pagina_contato_secao_apresentacao">
                <div >
                    <h1>Entre em contato com nosso suporte</h1>
                    <p>Preencha o formulário abaixo e nossa equipe entrará em contato com você o mais rápido possível. É simples, rápido e seguro!</p>
                </div>
            </section>

            <div className='form-wrapper'>
                <form className='container_pagina_contato_secao_formulario'>
                        <CampoFormulario
                            id="nome"
                            label="Nome"
                            name="nome"
                            placeholder="Digite seu nome"
                        />

                        <CampoFormulario
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Digite seu email"
                        />

                        <CampoFormulario
                            label="CPF"
                            id="cpf"
                            name="cpf"
                            placeholder="Digite seu CPF"
                        />

                        <CampoFormulario
                            label="Mensagem"
                            id="mensagem"
                            name="mensagem"
                            placeholder="Digite sua mensagem"
                            multiline={true}
                        />
                    <div className='container_pagina_contato_secao_formulario_botao'>
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>


            <section id="container_pagina_contato_secao_informacoes">
                <h1>Informações de contato direto</h1>
                <p>Se você tiver dúvidas, precisar de ajuda com sua consulta ou apenas quiser falar com a gente, estamos
                    aqui para te ouvir. Entre em contato pelo canal que for mais fácil para você — será um prazer ajudar!
                </p>

                <ul>
                    <li className="container_pagina_contato_secao_informacoes_itens">
                        <img className="icones" src={IconTelefone} alt="Ícone do telefone" />
                        <p><strong>Telefone:</strong> (11) 2661-000</p>
                    </li>
                    <li className="container_pagina_contato_secao_informacoes_itens">
                        <img className="icones" src={IconEmail} alt="Ícone do email" />
                        <p><strong>Email:</strong> suporte@hospitaldasclinicas.com.br</p>
                    </li>
                    <li className="container_pagina_contato_secao_informacoes_itens">
                        <img className="icones" src={IconSuporte} alt="Ícone de suporte" />
                        <p><strong>Atendimento:</strong> segunda a sexta - 8h às 18h </p>
                    </li>
                </ul>
            </section>
        </main>
    );
};

export default Contato;