import React, { useState } from "react";
import { login } from "../services/apiService"; // Assure-toi que login est bien importé depuis ton service API
import { useNavigate } from "react-router-dom"; // Hook pour la navigation
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import { jwtDecode } from "jwt-decode"; // Utilisation correcte du jwtDecode

const LoginPage = () => {
  const [mail, setMail] = useState(""); // Renommé userId en mail
  const [passwd, setPasswd] = useState(""); // Renommé userPinCode en passwd
  const [error, setError] = useState(""); // Gérer les erreurs
  const navigate = useNavigate(); // Hook pour la navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page à la soumission du formulaire

    if (!mail || !passwd) {
      // Vérifie que les deux champs sont remplis
      setError("Tous les champs sont obligatoires");
      return;
    }

    try {
      // Appel à l'API pour la connexion avec mail et passwd
      const data = await login(mail, passwd);

      // Dans LoginPage, avant l'appel à login(), ajoute un log
      console.log("Avant login - localStorage:", {
        token: localStorage.getItem("token"),
        idCompteUtilisateur: localStorage.getItem("idCompteUtilisateur"),
        role: localStorage.getItem("role"),
        mail,
        passwd,
      });

      console.log("Réponse login:", data);

      // Après avoir reçu la réponse de login, log les données reçues et ce qui sera stocké :
      console.log("Réponse login:", data);
      console.log("Stockage session - avant setItem", {
        token: localStorage.getItem("token"),
        idCompteUtilisateur: localStorage.getItem("idCompteUtilisateur"),
        role: localStorage.getItem("role"),
      });

      // Récupérer le token de la réponse
      const token = data.tokenOrMessage; // Utiliser 'tokenOrMessage' ici
      if (!token) {
        throw new Error("Token manquant dans la réponse");
      }

      // Décoder le token JWT
      const decodedToken = jwtDecode(token); // Décoder le token JWT avec `jwtDecode`
      console.log("Token décodé:", decodedToken); // Affichez le contenu du token décodé

      // Stocke le token et le rôle de l'utilisateur
      localStorage.setItem("token", token);
      localStorage.setItem("role", decodedToken.role);
      localStorage.setItem(
        "idCompteUtilisateur",
        decodedToken.idCompteUtilisateur
      );

      //Test
      console.log("Stockage session - après setItem", {
        token: localStorage.getItem("token"),
        idCompteUtilisateur: localStorage.getItem("idCompteUtilisateur"),
        role: localStorage.getItem("role"),
      });

      // Vérifie le rôle et redirige en conséquence
      if (data.role === "admin") {
        navigate("/admin-dashboard"); // Redirige vers le tableau de bord admin
      } else {
        navigate("/home"); // Redirige vers la page d'accueil pour l'utilisateur normal
      }
    } catch (err) {
      // En cas d'erreur, afficher un message d'erreur
      setError("Identifiant ou mot de passe incorrect");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex", // Utilise flexbox pour centrer le contenu
        justifyContent: "center", // Centrer horizontalement
        alignItems: "center", // Centrer verticalement
        height: "100vh", // Utiliser toute la hauteur de la fenêtre
      }}
    >
      <Paper
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          myATM
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Veuillez saisir vos identifiants de connexion
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={mail}
            onChange={(e) => setMail(e.target.value)} // Utilisation de mail
            margin="normal"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mot de passe"
            variant="outlined"
            type="password"
            fullWidth
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)} // Utilisation de passwd
            margin="normal"
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#646cff",
              "&:hover": {
                backgroundColor: "#535bf2",
              },
            }}
          >
            Se connecter
          </Button>
        </form>

        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default LoginPage;
