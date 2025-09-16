import CardIntegrantes from '../../components/CardIntegrantes';
import ImgEquipe from '../../assets/images/imagem-equipe.png'
import { integrantes } from '../../data/integrantes';
import { useState, useEffect } from 'react'

const Integrantes = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <main id="container_integrantes" className={loaded ? 'loaded' : ''}>
            <section className="integrantes_introducao">
                <div className="integrantes_introducao_conteudo">
                    <h1>Conheça nossa equipe</h1>
                    <p className="integrantes_introducao_subtitulo">
                        Conheça os desenvolvedores por trás da sua experiência de saúde digital.
                    </p>
                </div>
                <div>
                    <img
                        src={ImgEquipe}
                        alt="Ilustração de equipe de desenvolvimento trabalhando juntos"
                        className="integrantes_ilustracao_equipe"
                    />
                </div>
            </section>

            <section className="integrantes_equipe">
                <div className="integrantes_equipe_titulo">
                    <h2>Nossos Desenvolvedores</h2>
                </div>

                <div className="integrantes_equipe_cards">
                    {integrantes.map((pessoa, index) => (
                        <CardIntegrantes key={index} {...pessoa} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Integrantes;