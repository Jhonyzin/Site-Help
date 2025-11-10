import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './Paciente.css';

export default function HistoricoPaciente() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarConsultas();
  }, []);

  const carregarConsultas = async () => {
    try {
      const response = await api.get('/consulta');
      const dados = response.data.map((item) => ({
        consulta_id: item.consulta_id,
        nome: item.nome,
        especialidade: item.especialidade || 'Não informado',
        status: item.status,
        horario: formatarHorario(item.data_hora),
        tempo: calcularTempoPassado(item.data_hora),
        valor: item.valor || 'gratuita',
        data_hora: item.data_hora,
      }));
      setConsultas(dados);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatarHorario = (dataHoraStr) => {
    const data = new Date(dataHoraStr);
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  };

  const calcularTempoPassado = (dataHoraStr) => {
    const agora = new Date();
    const dataConsulta = new Date(dataHoraStr);
    const diffMs = agora - dataConsulta;
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias < 1) return 'Hoje';
    if (diffDias === 1) return 'Ontem';
    if (diffDias < 30) return `${diffDias} dias`;
    const meses = Math.floor(diffDias / 30);
    return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
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
      <div className="paciente-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="paciente-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/paciente/inicio')}>
          ← Voltar
        </button>
        <h1>Histórico de Consultas</h1>
      </div>

      <div className="consultas-list">
        {consultas.length === 0 ? (
          <div className="empty-state">Nenhuma consulta encontrada</div>
        ) : (
          consultas.map((consulta) => (
            <div
              key={consulta.consulta_id}
              className="consulta-card"
              onClick={() => navigate(`/paciente/consulta/${consulta.consulta_id}`)}
            >
              <div
                className="status-bar"
                style={{ backgroundColor: getCorBarra(consulta.status) }}
              />
              <div className="consulta-content">
                <div className="consulta-header">
                  <h3>{consulta.nome}</h3>
                  <span className="status-badge">{consulta.status}</span>
                </div>
                <p style={{ color: '#aaa', marginBottom: '10px' }}>{consulta.especialidade}</p>
                <div className="consulta-info">
                  <span>🕐 {consulta.horario}</span>
                  <span>📅 {consulta.tempo}</span>
                  <span>💰 {consulta.valor}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

