import './FaqItem.css'
import IconSeta from '../../assets/icons/icon-seta.png'


type FAQItemProps = {
  pergunta: string;
  resposta: string;
};

export default function FaqItem({ pergunta, resposta }: FAQItemProps) {
  return (
    <details className="faq-itens">

      <summary>
        <span>{pergunta}</span>
        <img src={IconSeta} alt="Seta" className="seta" />
      </summary>

      <div className="faq-resposta">
        <p>{resposta}</p>
      </div>

    </details>
  );
}