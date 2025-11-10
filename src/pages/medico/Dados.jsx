import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Medico.css';

export default function DadosMedico() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="medico-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/medico/inicio')}>
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
            <strong>CRM:</strong> {user.crm}
          </div>
          <div className="dados-item">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="dados-item">
            <strong>Telefone:</strong> {user.telefone}
          </div>
          {user.especialidade && (
            <div className="dados-item">
              <strong>Especialidade:</strong> {user.especialidade}
            </div>
          )}
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

