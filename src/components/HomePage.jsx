import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigateToOperations = () => {
    navigate("/operations"); // Rediriger vers la page des opérations
  };

  const handleNavigateToBalance = () => {
    navigate("/balance"); // Rediriger vers la page de consultation du solde
  };

  const handleNavigateToWithdraw = () => {
    navigate("/withdraw"); // Rediriger vers la page de retrait
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Retirer le token et déconnecter l'utilisateur
    navigate("/"); // Rediriger vers la page de login
  };

  return (
    <Container
      sx={{
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", 
      }}
    >
      <Paper
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "row", 
          justifyContent: "space-between", 
          alignItems: "center", 
          width: "100%",
          maxWidth: "800px", 
        }}
      >
        {/* Section gauche : typographie */}
        <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <Paper
            sx={{
              boxShadow: 0,
              display: "flex",
              flexDirection: "column", 
              justifyContent: "space-between", 
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
              }}
            >
              myATM
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: "1.5rem", 
                fontWeight: "normal",
              }}
            >
              Bienvenu(e) !
            </Typography>
          </Paper>
        </Box>

        {/* Section droite : boutons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end", // Alignement des boutons à droite
            width: "50%",
            gap: 2, // Espacement entre les boutons
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#646cff",
              "&:hover": { backgroundColor: "#535bf2" },
              width: "200px", // Largeur fixée des boutons
            }}
            onClick={handleNavigateToBalance}
          >
            Consultation de solde
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#646cff",
              "&:hover": { backgroundColor: "#535bf2" },
              width: "200px", // Largeur fixée des boutons
            }}
            onClick={handleNavigateToOperations}
          >
            Historique des opérations
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#646cff",
              "&:hover": { backgroundColor: "#535bf2" },
              width: "200px", // Largeur fixée des boutons
            }}
            onClick={handleNavigateToWithdraw}
          >
            Retrait
          </Button>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#fff",
              borderColor: "#646cff",
              color: "#646cff",
              "&:hover": { borderColor: "#535bf2", color: "#535bf2" },
              width: "200px", // Largeur fixée des boutons
            }}
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
