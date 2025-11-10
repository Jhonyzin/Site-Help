import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Medico.css';

export default function InicioMedico() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');

  useEffect(() => {
    if (user) {
      setNome(user.nome || 'Médico');
      setEspecialidade(user.especialidade || '');
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="medico-container">
      <div className="medico-header">
        <div className="perfil-section">
          {user?.imagem_perfil ? (
            <img src={user.imagem_perfil} alt="Perfil" className="perfil-img" />
          ) : (
            <div className="perfil-placeholder">👨‍⚕️</div>
          )}
          <div>
            <h2>{nome}</h2>
            {especialidade && <p className="especialidade">{especialidade}</p>}
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </div>

      <div className="menu-grid">
        <div className="menu-item" onClick={() => navigate('/medico/consultas')}>
          <div className="menu-icon">📋</div>
          <span>Consultas</span>
        </div>

        <div className="menu-item" onClick={() => navigate('/medico/historico-pacientes')}>
          <div className="menu-icon">👥</div>
          <span>Histórico de Pacientes</span>
        </div>

        <div className="menu-item" onClick={() => navigate('/medico/criar-consulta')}>
          <div className="menu-icon">➕</div>
          <span>Criar Consulta</span>
        </div>

        <div className="menu-item" onClick={() => navigate('/medico/dados')}>
          <div className="menu-icon">👤</div>
          <span>Dados Pessoais</span>
        </div>
      </div>
    </div>
  );
}

