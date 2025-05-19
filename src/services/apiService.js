import axios from "axios";

// URL de base de ton backend Spring Boot
const API_URL = "http://localhost:8080/api";

// Créer une instance d'Axios avec une configuration par défaut
const apiRest = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter un intercepteur pour insérer le token JWT dans les headers
apiRest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonction pour login (récupérer un token JWT)
export const login = async (mail, passwd) => {
  try {
    const response = await apiRest.post("/login", { mail, passwd });
    console.log("Utilisateur: ", response.data);
    return response.data; // Contient le token JWT
  } catch (error) {
    throw error.response?.data || { message: "Erreur de connexion" };
  }
};

// Fonction pour récupérer le solde
export const getBalance = async () => {
  const idCompteUtilisateur = localStorage.getItem("idCompteUtilisateur"); // Utiliser idCompteUtilisateur ici
  if (!idCompteUtilisateur) {
    console.log("! idCompteUtilisateur");
    throw new Error("ID du compte utilisateur introuvable");
  }

  try {
    // Appel à l'API pour récupérer le solde de l'utilisateur
    const response = await apiRest.get(`/comptes/solde/${idCompteUtilisateur}`);

    // Récupérer le solde et l'ID du compte
    return {
      balance: response.data.solde, // Récupérer le solde
      idCompteUtilisateur: response.data.idCompteUtilisateur, // Récupérer l'ID du compte utilisateur
    };
  } catch (error) {
    throw (
      error.response?.data || { message: "Erreur de récupération du solde" }
    );
  }
};

export const effectuerRetrait = async (montant) => {
  const idCompteUtilisateur = localStorage.getItem("idCompteUtilisateur");
  const token = localStorage.getItem("token");

  if (!token || !idCompteUtilisateur) {
    throw new Error("Utilisateur non connecté.");
  }

  const response = await apiRest.post(
    "/operations",
    {
      valeur: montant,
      idTypeOperation: 2, // id du type "Retrait" (à adapter si différent)
      idCompteUtilisateur: parseInt(idCompteUtilisateur),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export default apiRest;
