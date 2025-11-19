import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CalendarIcon, UsersIcon, PlusIcon, UserIcon, ActivityIcon, CheckCircleIcon, SettingsIcon } from '../../components/icons.jsx';
import './Medico.css';

export default function InicioMedico() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [status, setStatus] = useState("offline");

  // TEMPOS DE CADA STATUS
  const [timers, setTimers] = useState({
    online: 0,
    offline: 0,
    break: 0,
    pausa: 0,
  });

  // dropdown
  const [open, setOpen] = useState(false);

  // incrementa apenas o status atual
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => ({
        ...prev,
        [status]: prev[status] + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  function changeStatus(newStatus) {
    setStatus(newStatus);
    setOpen(false);
  }

  function formatTime(sec) {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

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

        <div className="header-buttons">
          <button
            className="dados-btn"
            onClick={() => navigate('/medico/dados')}
          >
            Dados Pessoais
          </button>

          {/* STATUS FINAL */}
          <div className="status-group">

            {/* BOTÃO PRINCIPAL */}
              <button
                className={`status-btn ${status}`}
                onClick={() => setOpen(!open)}
              >
                <span className="status-icon">⚡</span>
                <span className="status-text">
                  Status: <strong>{status.toUpperCase()}</strong>
                </span>
                
                <span className="status-timer">
                  {formatTime(timers[status])}
                </span>

                <span className="chevron">{open ? "▲" : "▼"}</span>
              </button>

            {/* MENU DROPDOWN */}
            {open && (
              <div className="status-options">
                <div
                  className="status-option online"
                  onClick={() => changeStatus("online")}
                >
                  <span className="icon">🟢</span>
                  <div className="text">
                    <strong>Online</strong>
                    <span>Disponível para consultas</span>
                  </div>
                </div>

                <div
                  className="status-option offline"
                  onClick={() => changeStatus("offline")}
                >
                  <span className="icon">🔴</span>
                  <div className="text">
                    <strong>Offline</strong>
                    <span>Indisponível no momento</span>
                  </div>
                </div>

                <div
                  className="status-option break"
                  onClick={() => changeStatus("break")}
                >
                  <span className="icon">🟡</span>
                  <div className="text">
                    <strong>Break</strong>
                    <span>Pausa rápida</span>
                  </div>
                </div>

                <div
                  className="status-option pausa"
                  onClick={() => changeStatus("pausa")}
                >
                  <span className="icon">🟣</span>
                  <div className="text">
                    <strong>Pausa Particular</strong>
                    <span>Ausência por tempo indeterminado</span>
                  </div>
                </div>
              </div>

            )}
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>

      <div className="stats-container">
        <div className="stats-card">
          <div className="stats-card-header">
            <CalendarIcon size={24} color="#e63946" />
            <span className="stats-card-title">Total de Consultas</span>
          </div>
          <p className="stats-card-value">324</p>
        </div>

        <div className="stats-card">
          <div className="stats-card-header">
            <ActivityIcon size={24} color="#f77f00" />
            <span className="stats-card-title">Consultas Hoje</span>
          </div>
          <p className="stats-card-value">teste</p>
        </div>

        <div className="stats-card">
          <div className="stats-card-header">
            <CheckCircleIcon size={24} color="#06d6a0" />
            <span className="stats-card-title">Concluídas</span>
          </div>
          <p className="stats-card-value">32</p>
        </div>
      </div>

      <div className="menu-grid">
        <div
          className="menu-item single-large"
          onClick={() => navigate('/medico/criar-consulta')}
        >
          <div className="menu-icon">➕</div>
          <span>Criar Consulta</span>
        </div>
      </div>
    </div>
  );
}