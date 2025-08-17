import './Integrantes.css'
import CardIntegrantes from '../../components/CardIntegrantes';
import FotoAnna from '../../assets/images/foto-anna-830px.png'
import FotoDuarte from '../../assets/images/foto-duarte-830px.png'
import FotoGuedes from '../../assets/images/foto-guedes-830px.png'

const Integrantes = () => {
    return (
        <main id="container_integrantes">
            <section>
                <h1>Conheça nossa equipe</h1>

                <div className="cards">
                    <CardIntegrantes
                        nome="Anna Clara Russo Luca"
                        rm="561928"
                        turma="1TDSPW"
                        foto={FotoAnna}
                        alt="Foto da integrante Anna Clara"
                        linkedin="https://www.linkedin.com/in/annaclararussoluca/"
                        github="https://github.com/annaclrl"
                    />

                    <CardIntegrantes
                        nome="Gabriel Duarte Maciel"
                        rm="565754"
                        turma="1TDSPW"
                        foto={FotoDuarte}
                        alt="Foto do integrante Gabriel Duarte"
                        linkedin={"https://www.linkedin.com/in/gabriel-duarte1010"}
                        github="https://github.com/duartegdm"
                    />

                    <CardIntegrantes
                        nome="Tiago Guedes da Costa"
                        rm="564731"
                        turma="1TDSPW"
                        foto={FotoGuedes}
                        alt="Foto do integrante Tiago Guedes"
                        linkedin="https://www.linkedin.com/in/tiago-guedes-7225a5276"
                        github="https://github.com/Tiagozguedes"
                    />
                </div>
            </section>
        </main>
    );
};

export default Integrantes;