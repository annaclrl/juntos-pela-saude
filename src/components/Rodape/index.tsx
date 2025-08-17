import { Link } from "react-router-dom";
import './Rodape.css'

const Rodape = () => {
    return (
        <footer>
            <Link to={"/integrantes"}>Integrantes</Link>
            <p>© 2025 Juntos pela Saúde. Todos os direitos reservados.</p>
        </footer>
    )
}

export default Rodape;
  