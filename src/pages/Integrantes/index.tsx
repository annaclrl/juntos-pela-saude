import './Integrantes.css'
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
            <section className="integrantes-hero">
                <div className="hero-content">
                    <h1>Conheça nossa equipe</h1>
                    <p className="hero-subtitle">
                        Conheça os desenvolvedores por trás da sua experiência de saúde digital.
                    </p>
                </div>
                <div className="hero-image">
                    <img
                        src={ImgEquipe}
                        alt="Ilustração de equipe de desenvolvimento trabalhando juntos"
                        className="team-illustration"
                    />
                </div>
            </section>

            <section className="integrantes-content">
                <div className="section-header">
                    <h2>Nossos Desenvolvedores</h2>
                </div>

                <div className="cards">
                    {integrantes.map((pessoa, index) => (
                        <CardIntegrantes key={index} {...pessoa} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Integrantes;