import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './Medico.css';

export default function ConsultasMedico() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarConsultas();
  }, []);

  const carregarConsultas = async () => {
    try {
      const response = await api.get('/consulta/medico');
      setConsultas(response.data);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatarHorario = (dataHoraStr) => {
    const data = new Date(dataHoraStr);
    return data.toLocaleString('pt-BR');
  };

  const getCorBarra = (status) => {
    switch (status?.toLowerCase()) {
      case 'concluida':
      case 'concluída':
        return '#7ed957';
      case 'cancelada':
        return '#ff0000';
      case 'agendada':
        return '#ffff00';
      default:
        return '#a6a6a6';
    }
  };

  if (loading) {
    return (
      <div className="medico-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="medico-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/medico/inicio')}>
          ← Voltar
        </button>
        <h1>Minhas Consultas</h1>
      </div>

      <div className="consultas-list">
        {consultas.length === 0 ? (
          <div className="empty-state">Nenhuma consulta encontrada</div>
        ) : (
          consultas.map((consulta) => (
            <div
              key={consulta.consulta_id}
              className="consulta-card"
              onClick={() => navigate(`/medico/consulta/${consulta.consulta_id}`)}
            >
              <div
                className="status-bar"
                style={{ backgroundColor: getCorBarra(consulta.status) }}
              />
              <div className="consulta-content">
                <div className="consulta-header">
                  <h3>{consulta.nome || 'Paciente'}</h3>
                  <span className="status-badge">{consulta.status}</span>
                </div>
                <p className="especialidade">
                  {formatarHorario(consulta.data_hora)}
                </p>
                {consulta.valor && (
                  <div className="consulta-info">
                    <span>💰 R$ {consulta.valor}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

