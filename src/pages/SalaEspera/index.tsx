import React, { useState, useEffect } from 'react';
import ImgEspera from '../../assets/images/img-espera.png';

interface WaitingRoomProps {
  onConsultationStart?: () => void;
}

const SalaEspera: React.FC<WaitingRoomProps> = ({ onConsultationStart }) => {
  const [estimatedTime] = useState<number>(5);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSimulateStart = () => {
    if (onConsultationStart) {
      onConsultationStart();
    }
  };

  return (
    <main>
      <div className="container_pagina_sala_espera">
        <div className="container_pagina_sala_espera_conteudo">
          <img
            src={ImgEspera}
            alt="Paciente aguardando em sala de espera virtual - pessoa sentada confortavelmente com ícones de relógio e símbolos de espera em fundo verde claro"
            className="container_pagina_sala_espera_conteudo_img"
          />

          <section>
            <div className="container_pagina_sala_espera_status">
              <h1 className="container_pagina_sala_espera_status_titulo">Sala de Espera</h1>
              <div className="container_pagina_sala_espera_status_tempo">{currentTime}</div>
            </div>

            <div>
              <div className="container_pagina_sala_espera_status_indicator">
                <div className="container_pagina_sala_espera_status_fila"></div>
                <span>Você está na fila de espera</span>
              </div>

              <p className="container_pagina_sala_espera_texto">
                Aguarde enquanto conectamos você com o profissional.
                Sua consulta começará em breve.
              </p>

              <div className="container_pagina_sala_espera_texto_tempo">
                <strong>Tempo estimado:</strong> aproximadamente {estimatedTime} minutos
              </div>
            </div>
          </section>
          <section className="container_pagina_sala_espera_texto_aguardar">
            <h3>Enquanto aguarda:</h3>
            <ul>
              <li>Verifique se seu áudio e vídeo estão funcionando</li>
              <li>Escolha um local tranquilo e bem iluminado</li>
              <li>Tenha seus documentos médicos à mão, se necessário</li>
              <li>Feche outras aplicações para melhor desempenho</li>
            </ul>
          </section>
          <div className="container_pagina_sala_espera_contato">
            <p>Problemas técnicos? <strong>(11) 2661-000</strong></p>
          </div>
          <button className="container_pagina_sala_espera_contato_botao" onClick={handleSimulateStart}> Iniciar Consulta</button>
        </div>
      </div>
    </main>
  );
};

export default SalaEspera;
