import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './Paciente.css';

export default function HospitaisPaciente() {
  const navigate = useNavigate();
  const [hospitais, setHospitais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);
          buscarHospitaisProximos(coords.latitude, coords.longitude);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  const buscarHospitaisProximos = async (lat, lng) => {
    try {
      const response = await api.get(`/localizacao/hospitais?lat=${lat}&lng=${lng}`);
      if (response.data.results && Array.isArray(response.data.results)) {
        setHospitais(response.data.results);
      }
    } catch (error) {
      console.error('Erro ao buscar hospitais:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="paciente-container">
        <div className="loading">Carregando hospitais...</div>
      </div>
    );
  }

  return (
    <div className="paciente-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/paciente/inicio')}>
          ← Voltar
        </button>
        <h1>Hospitais Próximos</h1>
      </div>

      {!location && (
        <div className="error-message">
          Não foi possível obter sua localização. Por favor, permita o acesso à localização.
        </div>
      )}

      <div className="hospitais-list">
        {hospitais.length === 0 ? (
          <div className="empty-state">Nenhum hospital encontrado próximo a você</div>
        ) : (
          hospitais.map((hospital, index) => (
            <div key={index} className="hospital-card">
              <h3>{hospital.name}</h3>
              {hospital.vicinity && <p>📍 {hospital.vicinity}</p>}
              {hospital.rating && (
                <p>
                  ⭐ {hospital.rating} ({hospital.user_ratings_total || 0} avaliações)
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

