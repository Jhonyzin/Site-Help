import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import './Paciente.css';

export default function InformacoesConsultaPaciente() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [consulta, setConsulta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      carregarConsulta();
    }
  }, [id]);

  const carregarConsulta = async () => {
    try {
      const response = await api.get(`/consulta/dados/${id}`);
      setConsulta(response.data);
    } catch (error) {
      console.error('Erro ao carregar consulta:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="paciente-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  if (!consulta) {
    return (
      <div className="paciente-container">
        <div className="error-message">Consulta não encontrada</div>
      </div>
    );
  }

  return (
    <div className="paciente-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/paciente/historico')}>
          ← Voltar
        </button>
        <h1>Informações da Consulta</h1>
      </div>

      <div className="consulta-detalhes">
        <div className="detalhe-item">
          <strong>Médico:</strong> {consulta.nome}
        </div>
        <div className="detalhe-item">
          <strong>Especialidade:</strong> {consulta.especialidade || 'Não informado'}
        </div>
        <div className="detalhe-item">
          <strong>Data e Hora:</strong> {new Date(consulta.data_hora).toLocaleString('pt-BR')}
        </div>
        <div className="detalhe-item">
          <strong>Status:</strong> {consulta.status}
        </div>
        {consulta.valor && (
          <div className="detalhe-item">
            <strong>Valor:</strong> R$ {consulta.valor}
          </div>
        )}
        {consulta.resultado && (
          <div className="detalhe-item">
            <strong>Resultado:</strong>
            <div className="resultado-texto">{consulta.resultado}</div>
          </div>
        )}
      </div>
    </div>
  );
}

