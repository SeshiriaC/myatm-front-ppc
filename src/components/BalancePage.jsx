import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  IconButton,
  Button,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { getBalance } from "../services/apiService"; // Assurez-vous d'importer la fonction getBalance

const BalancePage = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null); // Solde de l'utilisateur
  const [idCompteUtilisateur, setIdCompteUtilisateur] = useState(null); // ID du compte utilisateur
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(""); // Gestion des erreurs

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const data = await getBalance(); // Appel API pour récupérer le solde et l'ID du compte

        const id = localStorage.getItem("idCompteUtilisateur");

        setBalance(data.balance); // Mettez à jour le solde
        setIdCompteUtilisateur(id); // Mettez à jour l'ID du compte utilisateur
        setLoading(false); // Fin du chargement
      } catch (err) {
        setError("Erreur de récupération du solde");
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  const handleGoBack = () => {
    navigate("/home"); // Modifie le chemin si nécessaire
  };

  const handleWithdraw = () => {
    navigate("/withdraw"); // Rediriger vers la page de retrait
  };

  // Fonction pour formater l'ID du compte avec des zéros devant
  const formatAccountId = (idCompteUtilisateur) => {
    return String(idCompteUtilisateur).padStart(4, "0"); // Ajoute des zéros devant l'ID du compte utilisateur
  };

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        position: "relative",
        height: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Bouton retour */}
      <IconButton
        onClick={handleGoBack}
        sx={{
          position: "absolute",
          top: 24,
          left: 24,
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: 2,
          width: 60,
          height: 60,
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 32 }} />
      </IconButton>

      {/* Bouton "Solde" */}
      <Button
        variant="outlined"
        sx={{
          position: "absolute",
          top: 24,
          right: 24,
          borderRadius: "32px",
          paddingX: 4,
          paddingY: 1.5,
          fontSize: "1.25rem",
          borderColor: "#000",
          color: "#000",
          display: "flex",
          alignItems: "center",
        }}
        endIcon={<AccountBalanceWalletIcon sx={{ fontSize: 30 }} />}
      >
        Solde
      </Button>

      {/* Zone principale */}
      <Stack
        direction="row"
        spacing={10}
        alignItems="center"
        justifyContent="center"
      >
        {/* Bloc "Compte à vue" */}
        <Box textAlign="center">
          <Typography variant="h6" gutterBottom>
            Compte à vue
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {loading ? (
              <CircularProgress size={24} />
            ) : error ? (
              error
            ) : (
              `0000${formatAccountId(idCompteUtilisateur)}` // Affiche l'ID du compte avec des zéros
            )}
          </Typography>
        </Box>

        {/* Bloc "Montant disponible" */}
        <Box textAlign="center">
          <Typography variant="h6" gutterBottom>
            Montant disponible
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {loading ? (
              <CircularProgress size={24} />
            ) : error ? (
              error
            ) : (
              `MGA ${balance.toLocaleString("fr-FR")}` // Affiche le solde récupéré
            )}
          </Typography>
        </Box>
      </Stack>

      {/* Bouton de retrait */}
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: 24,
          backgroundColor: "#646cff",
          "&:hover": { backgroundColor: "#535bf2" },
          padding: "12px 30px",
          borderRadius: "30px",
          width: "200px",
        }}
        onClick={handleWithdraw}
      >
        Retirer
      </Button>
    </Container>
  );
};

export default BalancePage;
