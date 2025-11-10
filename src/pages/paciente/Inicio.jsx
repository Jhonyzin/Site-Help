import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import './Paciente.css';

export default function InicioPaciente() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (user) {
      setNome(user.nome || 'Usuário');
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="paciente-container">
      <div className="paciente-header">
        <div className="perfil-section">
          {user?.imagem_perfil ? (
            <img src={user.imagem_perfil} alt="Perfil" className="perfil-img" />
          ) : (
            <div className="perfil-placeholder">👤</div>
          )}
          <h2>{nome}</h2>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </div>

      <div className="menu-grid">
        <div className="menu-item" onClick={() => navigate('/paciente/historico')}>
          <div className="menu-icon">📋</div>
          <span>Histórico de Saúde</span>
        </div>

        <div className="menu-item" onClick={() => navigate('/paciente/pulseira')}>
          <div className="menu-icon">⌚</div>
          <span>Minha Pulseira</span>
        </div>

        <div className="menu-item" onClick={() => navigate('/paciente/medicamentos')}>
          <div className="menu-icon">💊</div>
          <span>Meus Medicamentos</span>
        </div>

        <div className="menu-item" onClick={() => navigate('/paciente/hospitais')}>
          <div className="menu-icon">🏥</div>
          <span>Hospitais Próximos</span>
        </div>

        <div className="menu-item" onClick={() => navigate('/paciente/dados')}>
          <div className="menu-icon">👤</div>
          <span>Dados Pessoais</span>
        </div>

        <div className="menu-item" onClick={() => navigate('/paciente/config')}>
          <div className="menu-icon">⚙️</div>
          <span>Configurações</span>
        </div>
      </div>
    </div>
  );
}

