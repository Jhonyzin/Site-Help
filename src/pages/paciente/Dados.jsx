import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Paciente.css';

export default function DadosPaciente() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="paciente-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/paciente/inicio')}>
          ← Voltar
        </button>
        <h1>Dados Pessoais</h1>
      </div>

      {user && (
        <div className="dados-card">
          <div className="dados-item">
            <strong>Nome:</strong> {user.nome}
          </div>
          <div className="dados-item">
            <strong>CPF:</strong> {user.cpf}
          </div>
          <div className="dados-item">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="dados-item">
            <strong>Telefone:</strong> {user.telefone}
          </div>
          {user.data_nascimento && (
            <div className="dados-item">
              <strong>Data de Nascimento:</strong> {user.data_nascimento}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

