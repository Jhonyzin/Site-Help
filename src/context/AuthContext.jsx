import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userType, setUserType] = useState(localStorage.getItem('userType') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const endpoint = userType === 'medico' ? '/medico' : '/usuario';
      const response = await api.get(endpoint);
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials, type) => {
    try {
      const endpoint = type === 'medico' ? '/medico/login' : '/usuario/login';
      const response = await api.post(endpoint, credentials);
      
      const { token: newToken } = response.data;
      setToken(newToken);
      setUserType(type);
      localStorage.setItem('token', newToken);
      localStorage.setItem('userType', type);
      
      await loadUser();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao fazer login',
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUserType(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  };

  const value = {
    token,
    userType,
    user,
    loading,
    login,
    logout,
    loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

