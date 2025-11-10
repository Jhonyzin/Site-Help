import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatarCPF } from '../utils/validacao';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginValue, setLoginValue] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('usuario');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    if (!loginValue.trim() || !senha.trim()) {
      setErro('Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      const payload =
        tipoUsuario === 'usuario'
          ? { cpf: loginValue.replace(/\D/g, ''), senha }
          : { crm: loginValue.trim(), senha };

      const result = await login(payload, tipoUsuario);

      if (result.success) {
        navigate(tipoUsuario === 'usuario' ? '/paciente/inicio' : '/medico/inicio');
      } else {
        setErro(result.message || 'Erro ao fazer login');
      }
    } catch (erro) {
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Help</h1>
          <h1>+</h1>
        </div>

        <div className="tipo-usuario-buttons">
          <button
            className={`tipo-btn ${tipoUsuario === 'usuario' ? 'active' : ''}`}
            onClick={() => {
              setTipoUsuario('usuario');
              setLoginValue('');
            }}
          >
            Paciente
          </button>
          <button
            className={`tipo-btn ${tipoUsuario === 'medico' ? 'active' : ''}`}
            onClick={() => {
              setTipoUsuario('medico');
              setLoginValue('');
            }}
          >
            Médico
          </button>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type={tipoUsuario === 'usuario' ? 'text' : 'text'}
              placeholder={tipoUsuario === 'usuario' ? 'CPF' : 'CRM'}
              value={loginValue}
              onChange={(e) =>
                setLoginValue(
                  tipoUsuario === 'usuario' ? formatarCPF(e.target.value) : e.target.value
                )
              }
              maxLength={tipoUsuario === 'usuario' ? 14 : 15}
              required
            />
          </div>

          <div className="input-group password-group">
            <input
              type={senhaVisivel ? 'text' : 'password'}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setSenhaVisivel(!senhaVisivel)}
            >
              {senhaVisivel ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          {erro && <div className="error-message">{erro}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Não tem conta?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(tipoUsuario === 'usuario' ? '/cadastro' : '/cadastro-medico');
              }}
            >
              Fazer cadastro
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
