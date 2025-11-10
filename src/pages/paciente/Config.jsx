import { useNavigate } from 'react-router-dom';
import './Paciente.css';

export default function ConfigPaciente() {
  const navigate = useNavigate();

  return (
    <div className="paciente-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/paciente/inicio')}>
          ← Voltar
        </button>
        <h1>Configurações</h1>
      </div>

      <div className="config-menu">
        <div className="config-item" onClick={() => navigate('/paciente/seguranca')}>
          🔒 Segurança
        </div>
        <div className="config-item" onClick={() => navigate('/paciente/acessibilidade')}>
          ♿ Acessibilidade
        </div>
      </div>
    </div>
  );
}

