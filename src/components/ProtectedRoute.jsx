import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredUserType }) {
  const { token, userType, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #4f7df3, #6dc2ff)',
          color: 'white',
          fontSize: '18px',
        }}
      >
        Carregando...
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredUserType && userType !== requiredUserType) {
    return (
      <Navigate
        to={userType === 'medico' ? '/medico/inicio' : '/paciente/inicio'}
        replace
      />
    );
  }

  return <>{children}</>;
}

