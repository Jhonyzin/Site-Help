import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { formatarCPF, formatarDataHora } from '../../utils/validacao';
import './Medico.css';

export default function CriarConsultaMedico() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cpf, setCpf] = useState('');
  const [data_hora, setDataHora] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('agendada');
  const [medico_id, setMedicoId] = useState('');
  const [pacienteInfo, setPacienteInfo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const response = await api.get('/medico/dados');
      if (response.data.success) {
        setMedicoId(response.data.data.medico_id);
      } else if (response.data.medico_id) {
        setMedicoId(response.data.medico_id);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const buscarPacientePorCPF = async () => {
    if (!cpf || cpf.replace(/\D/g, '').length < 11) {
      setErro('Digite um CPF válido');
      return;
    }

    try {
      setErro('');
      const cpfLimpo = cpf.replace(/\D/g, '');

      const response = await api.get(`/usuario/cpf/${cpfLimpo}`);

      if (response.data.success) {
        setPacienteInfo(response.data.data);
      } else if (response.data.nome) {
        setPacienteInfo(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      if (error.response?.status === 404) {
        setErro('Paciente não encontrado com este CPF');
      } else {
        setErro('Erro ao buscar paciente');
      }
      setPacienteInfo(null);
    }
  };

  const criarConsulta = async (e) => {
    e.preventDefault();
    setErro('');

    if (!cpf || !data_hora || !valor || !medico_id) {
      setErro('Preencha todos os campos obrigatórios');
      return;
    }

    if (!pacienteInfo) {
      setErro('Busque um paciente válido primeiro');
      return;
    }

    try {
      setLoading(true);

      // Converter data/hora do formato DD/MM/YYYY HH:MM para formato ISO
      const partes = data_hora.split(' ');
      const dataParte = partes[0].split('/');
      const horaParte = partes[1] || '00:00';
      const dataFormatada = `${dataParte[2]}-${dataParte[1]}-${dataParte[0]}T${horaParte}:00`;

      const response = await api.post('/consulta/criar', {
        cpf: cpf.replace(/\D/g, ''),
        medico_id: medico_id,
        status: status,
        data_hora: dataFormatada,
        valor: parseFloat(valor),
      });

      if (response.data.success) {
        alert('Consulta criada com sucesso!');
        navigate('/medico/inicio');
      }
    } catch (error) {
      console.error('Erro ao criar consulta:', error);
      setErro('Não foi possível criar a consulta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medico-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/medico/inicio')}>
          ← Voltar
        </button>
        <h1>Criar Nova Consulta</h1>
      </div>

      <form onSubmit={criarConsulta} className="form-container">
        <div className="form-group">
          <label>CPF do Paciente</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(formatarCPF(e.target.value))}
              maxLength={14}
              required
            />
            <button
              type="button"
              onClick={buscarPacientePorCPF}
              className="submit-btn"
              style={{ width: 'auto', padding: '12px 20px', margin: 0 }}
            >
              Buscar
            </button>
          </div>
        </div>

        {pacienteInfo && (
          <div className="paciente-info">
            <p><strong>Paciente:</strong> {pacienteInfo.nome}</p>
            <p><strong>Email:</strong> {pacienteInfo.email}</p>
          </div>
        )}

        <div className="form-group">
          <label>Data e Horário (DD/MM/YYYY HH:MM)</label>
          <input
            type="text"
            placeholder="DD/MM/YYYY HH:MM"
            value={data_hora}
            onChange={(e) => setDataHora(formatarDataHora(e.target.value))}
            maxLength={16}
            required
          />
        </div>

        <div className="form-group">
          <label>Valor da Consulta</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <div className="status-buttons">
            <button
              type="button"
              className={`status-btn ${status === 'agendada' ? 'active' : ''}`}
              onClick={() => setStatus('agendada')}
            >
              Agendada
            </button>
            <button
              type="button"
              className={`status-btn ${status === 'concluída' ? 'active' : ''}`}
              onClick={() => setStatus('concluída')}
            >
              Concluída
            </button>
            <button
              type="button"
              className={`status-btn ${status === 'cancelada' ? 'active' : ''}`}
              onClick={() => setStatus('cancelada')}
            >
              Cancelada
            </button>
          </div>
        </div>

        {erro && <div className="error-message">{erro}</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Consulta'}
        </button>
      </form>
    </div>
  );
}

