import CampoFormulario from '../../components/CampoFormulario';
import IconTelefone from '../../assets/icons/icon-telefone.png';
import IconEmail from '../../assets/icons/icon-email.png';
import IconSuporte from '../../assets/icons/icon-suporte.png';
import './Contato.css'
import { useState } from 'react';

const Contato = () => {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [mensagemUsuario, setMensagemUsuario] = useState("");
    const [feedback, setFeedback] = useState<{ texto: string; cor: "red" | "green" } | null>(null);

    const validarCPF = (cpf: string) => {
        const cpfNumerico = cpf.replace(/\D/g, "");
        return cpfNumerico.length === 11;
    };

    const handleEnviar = (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome || !email || !cpf || !mensagemUsuario) {
            setFeedback({ texto: "Por favor, preencha todos os campos.", cor: "red" });
            return;
        }

        if (!validarCPF(cpf)) {
            setFeedback({ texto: "CPF inválido. Deve conter 11 dígitos.", cor: "red" });
            return;
        }

        setFeedback({ texto: "Mensagem enviada com sucesso!", cor: "green" });
        setNome("");
        setEmail("");
        setCpf("");
        setMensagemUsuario("");

        setTimeout(() => setFeedback(null), 4000);
    };

    return (
        <main id="container_pagina_contato">
            <section id="container_pagina_contato_secao_apresentacao">
                <div className="contato-header">
                    <h1>Entre em contato com nosso suporte</h1>
                    <p>Preencha o formulário abaixo e nossa equipe entrará em contato com você o mais rápido possível. É simples, rápido e seguro!</p>
                </div>
            </section>
            <div className="contato-content">
                <div className="form-section">
                    <div className='form-wrapper'>
                        <form className='container_pagina_contato_secao_formulario' onSubmit={handleEnviar}>
                            <CampoFormulario
                                id="nome"
                                label="Nome completo"
                                name="nome"
                                placeholder="Digite seu nome completo"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <CampoFormulario
                                label="Email"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="seu.email@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <CampoFormulario
                                label="CPF"
                                id="cpf"
                                name="cpf"
                                placeholder="000.000.000-00"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                            <CampoFormulario
                                label="Mensagem"
                                id="mensagem"
                                name="mensagem"
                                placeholder="Descreva sua dúvida ou solicitação..."
                                multiline={true}
                                value={mensagemUsuario}
                                onChange={(e) => setMensagemUsuario(e.target.value)}
                            />
                            {feedback && (
                                <div style={{ color: feedback.cor, marginTop: "10px" }}>
                                    {feedback.texto}
                                </div>
                            )}

                            <div className='container_pagina_contato_secao_formulario_botao'>
                                <button> <span className="spinner"></span>Enviar mensagem</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <section id="container_pagina_contato_secao_informacoes">
                <div className="container_pagina_contato_secao_informacoes_texto">
                    <h2>Informações de contato direto</h2>
                    <p>Se você tiver dúvidas, precisar de ajuda com sua consulta ou apenas quiser falar com a gente, estamos aqui para te ouvir. Entre em contato pelo canal que for mais fácil para você — será um prazer ajudar!</p>
                    <ul className="contato_informacoes">
                        <li className="container_pagina_contato_secao_informacoes_itens">
                            <div className="icon-wrapper">
                                <img className="icones" src={IconTelefone} alt="Ícone de telefone" />
                            </div>
                            <div className="contato_detalhes">
                                <h3>Telefone</h3>
                                <p>(11) 2661-0000</p>
                                <span className="contato_nota">Ligue para nosso atendimento</span>
                            </div>
                        </li>

                        <li className="container_pagina_contato_secao_informacoes_itens">
                            <div className="icon-wrapper">
                                <img className="icones" src={IconEmail} alt="Ícone de email" />
                            </div>
                            <div className="contato_detalhes">
                                <h3>Email</h3>
                                <p>suporte@hospitaldasclinicas.com.br</p>
                                <span className="contato_nota">Respondemos em até 24h</span>
                            </div>
                        </li>

                        <li className="container_pagina_contato_secao_informacoes_itens">
                            <div className="icon-wrapper">
                                <img className="icones" src={IconSuporte} alt="Ícone de suporte" />
                            </div>
                            <div className="contato_detalhes">
                                <h3>Horário de Atendimento</h3>
                                <p>Segunda a sexta: 8h às 18h</p>
                                <p>Sábado: 8h às 12h</p>
                                <span className="contato_nota">Exceto feriados</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
};

export default Contato;