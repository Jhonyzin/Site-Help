import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas de autenticação
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CadastroMedico from './pages/CadastroMedico';

// Páginas do paciente
import InicioPaciente from './pages/paciente/Inicio';
import HistoricoPaciente from './pages/paciente/Historico';
import HospitaisPaciente from './pages/paciente/Hospitais';
import MedicamentosPaciente from './pages/paciente/Medicamentos';
import DadosPaciente from './pages/paciente/Dados';
import ConfigPaciente from './pages/paciente/Config';
import SegurancaPaciente from './pages/paciente/Seguranca';
import AcessibilidadePaciente from './pages/paciente/Acessibilidade';
import PulseiraPaciente from './pages/paciente/Pulseira';
import InformacoesConsultaPaciente from './pages/paciente/InformacoesConsulta';

// Páginas do médico
import InicioMedico from './pages/medico/Inicio';
import ConsultasMedico from './pages/medico/Consultas';
import HistoricoPacientesMedico from './pages/medico/HistoricoPacientes';
import CriarConsultaMedico from './pages/medico/CriarConsulta';
import DadosMedico from './pages/medico/Dados';
import InformacoesConsultaMedico from './pages/medico/InformacoesConsulta';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro-medico" element={<CadastroMedico />} />
          
          {/* Rota raiz - redireciona para login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Rotas do paciente */}
          <Route
            path="/paciente/inicio"
            element={
              <ProtectedRoute requiredUserType="usuario">
                <InicioPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/historico"
            element={
              <ProtectedRoute requiredUserType="usuario">
                <HistoricoPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/hospitais"
            element={
              <ProtectedRoute requiredUserType="usuario">
                <HospitaisPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/medicamentos"
            element={
              <ProtectedRoute requiredUserType="usuario">
                <MedicamentosPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/dados"
            element={
              <ProtectedRoute requiredUserType="usuario">
                <DadosPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/config"
            element={
              <ProtectedRoute requiredUserType="usuario">
                <ConfigPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/seguranca"
            element={
              <ProtectedRoute requiredUserType="usuario">
                <SegurancaPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/acessibilidade"
            element={
              <ProtectedRoute requiredUserType="usuario">
                <AcessibilidadePaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/pulseira"
            element={
              <ProtectedRoute requiredUserType="usuario">
                <PulseiraPaciente />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paciente/consulta/:id"
            element={
              <ProtectedRoute requiredUserType="usuario">
                <InformacoesConsultaPaciente />
              </ProtectedRoute>
            }
          />

          {/* Rotas do médico */}
          <Route
            path="/medico/inicio"
            element={
              <ProtectedRoute requiredUserType="medico">
                <InicioMedico />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/consultas"
            element={
              <ProtectedRoute requiredUserType="medico">
                <ConsultasMedico />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/historico-pacientes"
            element={
              <ProtectedRoute requiredUserType="medico">
                <HistoricoPacientesMedico />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/criar-consulta"
            element={
              <ProtectedRoute requiredUserType="medico">
                <CriarConsultaMedico />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/dados"
            element={
              <ProtectedRoute requiredUserType="medico">
                <DadosMedico />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medico/consulta/:id"
            element={
              <ProtectedRoute requiredUserType="medico">
                <InformacoesConsultaMedico />
              </ProtectedRoute>
            }
          />

          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
