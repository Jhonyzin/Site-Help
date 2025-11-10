import { useNavigate } from 'react-router-dom';
import './Paciente.css';

export default function MedicamentosPaciente() {
  const navigate = useNavigate();

  return (
    <div className="paciente-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/paciente/inicio')}>
          ← Voltar
        </button>
        <h1>Meus Medicamentos</h1>
      </div>

      <div className="empty-state">
        Funcionalidade de medicamentos em desenvolvimento
      </div>
    </div>
  );
}

