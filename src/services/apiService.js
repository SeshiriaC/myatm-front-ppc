import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import nommé correct

const API_URL = "http://localhost:8080/api";

const apiRest = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

const logoutAndRedirect = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("idCompteUtilisateur");
  localStorage.removeItem("role");
  window.location.href = "/";
};

apiRest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (Date.now() >= decoded.exp * 1000) {
        logoutAndRedirect();
        return Promise.reject(new Error("Token expiré"));
      }
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiRest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logoutAndRedirect();
    }
    return Promise.reject(error);
  }
);

// Fonction pour login (récupérer un token JWT)
export const login = async (mail, passwd) => {
  try {
    const response = await apiRest.post("/login", { mail, passwd });
    console.log("Utilisateur: ", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur de connexion" };
  }
};

// Fonction pour récupérer le solde
export const getBalance = async () => {
  const idCompteUtilisateur = localStorage.getItem("idCompteUtilisateur");
  if (!idCompteUtilisateur)
    throw new Error("ID du compte utilisateur introuvable");

  try {
    const response = await apiRest.get(`/comptes/solde/${idCompteUtilisateur}`);
    return {
      balance: response.data.solde,
      idCompteUtilisateur: response.data.idCompteUtilisateur,
    };
  } catch (error) {
    throw (
      error.response?.data || { message: "Erreur de récupération du solde" }
    );
  }
};

// Fonction pour effectuer un retrait
export const effectuerRetrait = async (montant) => {
  const idCompteUtilisateur = localStorage.getItem("idCompteUtilisateur");
  if (!idCompteUtilisateur) throw new Error("Utilisateur non connecté.");

  try {
    const response = await apiRest.post("/operations", {
      valeur: montant,
      idTypeOperation: 2,
      idCompteUtilisateur: parseInt(idCompteUtilisateur),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur lors du retrait" };
  }
};

// Fonction pour effectuer un dépôt
export const effectuerDepot = async (montant) => {
  const idCompteUtilisateur = localStorage.getItem("idCompteUtilisateur");
  if (!idCompteUtilisateur) throw new Error("Utilisateur non connecté.");

  try {
    const response = await apiRest.post("/operations", {
      valeur: montant,
      idTypeOperation: 1, // 1 pour dépôt
      idCompteUtilisateur: parseInt(idCompteUtilisateur),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur lors du dépôt" };
  }
};

// Fonction pour récupérer l'historique des dernières opérations de l'utilisateur connecté
export const getHistorique = async () => {
  try {
    const response = await apiRest.get("/operations/historique");
    return response.data; // Retourne la liste des OperationDto
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Erreur lors de la récupération de l'historique",
      }
    );
  }
};

export default apiRest;
