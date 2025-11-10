import { useNavigate } from 'react-router-dom';
import './Medico.css';

export default function HistoricoPacientesMedico() {
  const navigate = useNavigate();

  return (
    <div className="medico-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/medico/inicio')}>
          ← Voltar
        </button>
        <h1>Histórico de Pacientes</h1>
      </div>

      <div className="empty-state">
        Funcionalidade de histórico de pacientes em desenvolvimento
      </div>
    </div>
  );
}

