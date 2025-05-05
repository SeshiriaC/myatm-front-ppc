import axios from 'axios';

// URL de base de ton backend Spring Boot
const API_URL = 'http://localhost:8080/api';

// Créer une instance d'Axios avec une configuration par défaut
const apiRest = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour insérer le token JWT dans les headers
apiRest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonction pour login (récupérer un token JWT)
export const login = async (userId, userPinCode) => {
  try {
    const response = await apiRest.post('/login', { userId, userPinCode });
    return response.data;  // Contient le token JWT
  } catch (error) {
    throw error.response?.data || { message: 'Erreur de connexion' };
  }
};

export default apiRest;
