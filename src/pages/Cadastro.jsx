import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
  validarCPF,
  formatarCPF,
  formatarTelefone,
  formatarData,
  formatarCep,
  dataValida,
  validarEmail,
} from '../utils/validacao';
import './Cadastro.css';

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    cep: '',
    estado: '',
    cidade: '',
    bairro: '',
    logradouro: '',
    numero: '',
    complemento: '',
  });
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then((res) => res.json())
      .then((data) => {
        setEstados(data.map((uf) => ({ label: uf.nome, value: uf.sigla })));
      })
      .catch((err) => console.error('Erro ao buscar estados:', err));
  }, []);

  useEffect(() => {
    if (form.estado) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${form.estado}/municipios`
      )
        .then((res) => res.json())
        .then((data) => {
          setCidades(data.map((mun) => ({ label: mun.nome, value: mun.nome })));
        })
        .catch((err) => console.error('Erro ao buscar municípios:', err));
    }
  }, [form.estado]);

  const handleChange = (name, value) => {
    let formattedValue = value;

    switch (name) {
      case 'cpf':
        formattedValue = formatarCPF(value);
        break;
      case 'telefone':
        formattedValue = formatarTelefone(value);
        break;
      case 'dataNascimento':
        formattedValue = formatarData(value);
        break;
      case 'cep':
        formattedValue = formatarCep(value);
        if (formattedValue.replace(/\D/g, '').length === 8) {
          fetchAddressByCep(formattedValue);
        }
        break;
    }

    setForm((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const fetchAddressByCep = async (cep) => {
    try {
      setLoadingCep(true);
      const response = await fetch(
        `https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`
      );
      const data = await response.json();

      if (!data.erro) {
        setForm((prev) => ({
          ...prev,
          estado: data.uf,
          cidade: data.localidade,
          bairro: data.bairro,
          logradouro: data.logradouro,
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setLoadingCep(false);
    }
  };

  const validateForm = () => {
    if (!form.nome.trim()) {
      setErro('Por favor, informe seu nome completo');
      return false;
    }

    if (!validarCPF(form.cpf)) {
      setErro('CPF inválido');
      return false;
    }

    if (!validarEmail(form.email)) {
      setErro('Email inválido');
      return false;
    }

    if (form.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem');
      return false;
    }

    if (!dataValida(form.dataNascimento)) {
      setErro('Data de nascimento inválida');
      return false;
    }

    return true;
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');

    if (!validateForm()) return;

    try {
      setLoading(true);
      const partesData = form.dataNascimento.split('/');
      const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;

      // Enviar apenas os campos que o backend espera
      const dadosCadastro = {
        nome: form.nome,
        cpf: form.cpf.replace(/\D/g, ''),
        senha: form.senha,
        email: form.email || null,
        telefone: form.telefone.replace(/\D/g, '') || null,
        dataNascimento: dataFormatada || null,
        cep: form.cep.replace(/\D/g, '') || null,
        estado: form.estado || null,
        cidade: form.cidade || null,
        bairro: form.bairro || null,
        logradouro: form.logradouro || null,
        numero: form.numero || null,
        complemento: form.complemento || null,
      };

      const response = await api.post('/usuario/cadastro', dadosCadastro);

      if (response.data.success) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        setErro(response.data.message || 'Falha no cadastro');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      
      // Tratar erros de rede especificamente
      if (error.isNetworkError || error.code === 'ECONNREFUSED' || error.message?.includes('Network Error')) {
        setErro('Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
      } else {
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error || 
                            error.message || 
                            'Falha no cadastro. Verifique os dados e tente novamente.';
        setErro(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h1>Cadastro de Paciente</h1>

        <form onSubmit={handleCadastro} className="cadastro-form">
          <input
            type="text"
            placeholder="Nome Completo"
            value={form.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="CPF"
            value={form.cpf}
            onChange={(e) => handleChange('cpf', e.target.value)}
            maxLength={14}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Telefone"
            value={form.telefone}
            onChange={(e) => handleChange('telefone', e.target.value)}
            maxLength={15}
            required
          />

          <input
            type="text"
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            value={form.dataNascimento}
            onChange={(e) => handleChange('dataNascimento', e.target.value)}
            maxLength={10}
            required
          />

          <input
            type="text"
            placeholder="CEP"
            value={form.cep}
            onChange={(e) => handleChange('cep', e.target.value)}
            maxLength={9}
            required
          />
          {loadingCep && <div className="loading">Buscando endereço...</div>}

          <select
            value={form.estado}
            onChange={(e) => handleChange('estado', e.target.value)}
            required
          >
            <option value="">Selecione o Estado</option>
            {estados.map((estado) => (
              <option key={estado.value} value={estado.value}>
                {estado.label}
              </option>
            ))}
          </select>

          <select
            value={form.cidade}
            onChange={(e) => handleChange('cidade', e.target.value)}
            disabled={!form.estado}
            required
          >
            <option value="">Selecione a Cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.value} value={cidade.value}>
                {cidade.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Bairro"
            value={form.bairro}
            onChange={(e) => handleChange('bairro', e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Logradouro"
            value={form.logradouro}
            onChange={(e) => handleChange('logradouro', e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Número"
            value={form.numero}
            onChange={(e) => handleChange('numero', e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Complemento"
            value={form.complemento}
            onChange={(e) => handleChange('complemento', e.target.value)}
          />

          <div className="password-group">
            <input
              type={senhaVisivel ? 'text' : 'password'}
              placeholder="Senha"
              value={form.senha}
              onChange={(e) => handleChange('senha', e.target.value)}
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

          <div className="password-group">
            <input
              type={senhaVisivel ? 'text' : 'password'}
              placeholder="Confirmar Senha"
              value={form.confirmarSenha}
              onChange={(e) => handleChange('confirmarSenha', e.target.value)}
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

          <button type="submit" className="cadastro-btn" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="login-link">
          Já tem conta? <a href="/login">Fazer login</a>
        </p>
      </div>
    </div>
  );
}

