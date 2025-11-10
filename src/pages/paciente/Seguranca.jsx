import { useNavigate } from 'react-router-dom';
import './Paciente.css';

export default function SegurancaPaciente() {
  const navigate = useNavigate();

  return (
    <div className="paciente-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/paciente/config')}>
          ← Voltar
        </button>
        <h1>Segurança</h1>
      </div>

      <div className="empty-state">Configurações de segurança em desenvolvimento</div>
    </div>
  );
}

