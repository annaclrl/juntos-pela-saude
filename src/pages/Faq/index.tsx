import FAQItem from '../../components/FaqItem';
import './Faq.css'

const perguntas = [
    {
        pergunta: "1. Como faço para acessar minha consulta?",
        resposta: "Você pode acessar sua consulta pelo nosso site..."
    },
    {
        pergunta: "2. Preciso instalar algum programa para a teleconsulta?",
        resposta: "Não! Nosso sistema funciona diretamente no navegador..."
    },
    {
        pergunta: "3. O que faço se minha câmera ou microfone não estiver funcionando?",
        resposta: "Durante a consulta, você verá um botão chamado “SOS”..."
    },
    {
        pergunta:  "4. Posso pedir ajuda para outra pessoa me cadastrar?",
        resposta: "Claro! Um familiar ou cuidador pode te ajudar no cadastro. Também temos um assistente virtual (chatbot) para facilitar esse processo."
    },
    {
        pergunta: "5. Como posso cancelar uma consulta?",
        resposta: "Na plataforma, há um botão claro para cancelamento. É só clicar e escolher o motivo. Tudo é feito em poucos passos."
    },
    {
        pergunta: "6. Por que preciso informar o motivo do cancelamento?",
        resposta:  "Isso ajuda a equipe a entender e melhorar a experiência dos pacientes. As opções são simples e rápidas de escolher."
    }, 
    {
        pergunta: "7. É seguro usar este sistema?",
        resposta: "Sim! Seus dados são protegidos com segurança, e só você e a equipe médica têm acesso às suas informações."
    }, 
]

const Faq = () => {
    return(
              <main>
        <section id="conteudo_faq">
          <h1>Perguntas Frequentes (FAQ)</h1>
          {perguntas.map((item, index) => (
            <FAQItem
              key={index}
              pergunta={item.pergunta}
              resposta={item.resposta}
            />
          ))}
        </section>
      </main>
    )
}

export default Faq;