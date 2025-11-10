import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/api';
import './Medico.css';

export default function InformacoesConsultaMedico() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [consulta, setConsulta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultado, setResultado] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (id) {
      carregarConsulta();
    }
  }, [id]);

  const carregarConsulta = async () => {
    try {
      const response = await api.get(`/consulta/dados/${id}`);
      setConsulta(response.data);
      setResultado(response.data.resultado || '');
    } catch (error) {
      console.error('Erro ao carregar consulta:', error);
    } finally {
      setLoading(false);
    }
  };

  const salvarResultado = async () => {
    try {
      setSalvando(true);
      await api.post(`/consulta/resultado/${id}`, { resultado });
      alert('Resultado salvo com sucesso!');
      carregarConsulta();
    } catch (error) {
      console.error('Erro ao salvar resultado:', error);
      alert('Erro ao salvar resultado');
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <div className="medico-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  if (!consulta) {
    return (
      <div className="medico-container">
        <div className="error-message">Consulta não encontrada</div>
      </div>
    );
  }

  return (
    <div className="medico-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/medico/consultas')}>
          ← Voltar
        </button>
        <h1>Informações da Consulta</h1>
      </div>

      <div className="consulta-detalhes">
        <div className="detalhe-item">
          <strong>Paciente:</strong> {consulta.nome || 'Não informado'}
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

        <div className="form-group" style={{ marginTop: '30px' }}>
          <label>Resultado da Consulta</label>
          <textarea
            value={resultado}
            onChange={(e) => setResultado(e.target.value)}
            placeholder="Digite o resultado da consulta..."
          />
          <button
            type="button"
            onClick={salvarResultado}
            className="submit-btn"
            disabled={salvando}
          >
            {salvando ? 'Salvando...' : 'Salvar Resultado'}
          </button>
        </div>
      </div>
    </div>
  );
}

