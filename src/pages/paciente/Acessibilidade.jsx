import { useNavigate } from 'react-router-dom';
import './Paciente.css';

export default function AcessibilidadePaciente() {
  const navigate = useNavigate();

  return (
    <div className="paciente-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/paciente/config')}>
          ← Voltar
        </button>
        <h1>Acessibilidade</h1>
      </div>

      <div className="empty-state">Configurações de acessibilidade em desenvolvimento</div>
    </div>
  );
}

