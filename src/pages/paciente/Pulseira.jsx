import { useNavigate } from 'react-router-dom';
import './Paciente.css';

export default function PulseiraPaciente() {
  const navigate = useNavigate();

  return (
    <div className="paciente-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/paciente/inicio')}>
          ← Voltar
        </button>
        <h1>Minha Pulseira</h1>
      </div>

      <div className="empty-state">
        Funcionalidade de pulseira NFC em desenvolvimento
      </div>
    </div>
  );
}

