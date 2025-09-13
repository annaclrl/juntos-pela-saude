import FAQItem from '../../components/FaqItem';
import './Faq.css'
import { perguntasFAQ } from '../../data/perguntasFAQ';

const Faq = () => {
    return(
        <main>
        <section id="conteudo_faq">
          <h1>Perguntas Frequentes (FAQ)</h1>
          {perguntasFAQ.map((item, index) => (
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