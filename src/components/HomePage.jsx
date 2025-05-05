import React from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Pour la navigation

const HomePage = () => {
  const navigate = useNavigate(); // Hook pour la navigation

  const handleLogout = () => {
    // Logique de déconnexion (vider le token)
    localStorage.removeItem("token");
    navigate("/"); // Rediriger vers la page de connexion après déconnexion
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
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
          BankName
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Bienvenue <span style={{ fontWeight: "bold" }}>userName</span>
        </Typography>

        <Button
          variant="outlined"
          sx={{ width: "100%", mb: 2 }}
          onClick={() => navigate("/solde")} // Remplacer par la page correspondante
        >
          Consultation de solde
        </Button>
        <Button
          variant="outlined"
          sx={{ width: "100%", mb: 2 }}
          onClick={() => navigate("/historique")} // Remplacer par la page correspondante
        >
          Historique des opérations
        </Button>
        <Button
          variant="outlined"
          sx={{ width: "100%", mb: 2 }}
          onClick={() => navigate("/retrait")} // Remplacer par la page correspondante
        >
          Retrait
        </Button>
        <Button
          variant="outlined"
          sx={{ width: "100%", mb: 2 }}
          onClick={handleLogout} // Déconnexion
        >
          Déconnexion
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
