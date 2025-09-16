import {useNavigate } from 'react-router-dom';
import IconeError from '../../assets/images/imagem-error.png';

const Error = () => {
    const navigate = useNavigate();

    const handleVoltar = () => {
        navigate('/');
    }

    return (
        <div className="not_found_container">
            <img src={IconeError} alt="Imagem de Não Encontrado" />
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <p>Ops! A página que você procura não existe.</p>
            <button onClick={handleVoltar}>Voltar</button>
        </div>
    );
}

export default Error;