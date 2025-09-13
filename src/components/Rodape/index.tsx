import { Link } from "react-router-dom";
import "./Rodape.css";

const Rodape = () => {
  return (
    <footer className="rodape">
      <div className="rodape_conteudo">
        <div className="rodape_links">
          <Link to="/integrantes" className="rodape_link" aria-label="Página dos integrantes">
            Integrantes
          </Link>
        </div>

        <div className="rodape_info">
          <p className="rodape_copyright">
            © 2025 Juntos pela Saúde. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
