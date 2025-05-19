import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  Button,
  Box,
  Grid,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { getBalance } from "../services/apiService";

const WithdrawPage = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [idCompteUtilisateur, setIdCompteUtilisateur] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const data = await getBalance();
        setBalance(data.balance);
        const id = localStorage.getItem("idCompteUtilisateur");
        setIdCompteUtilisateur(id);
      } catch (err) {
        console.error("Erreur lors de la récupération du solde :", err);
      }
    };

    fetchBalance();
  }, []);

  const handleGoBack = () => {
    navigate("/home");
  };

  const handleAmountClick = (amount) => {
    console.log(`Montant sélectionné : ${amount}`);
  };

  const formatAccountId = (id) => {
    return String(id).padStart(8, "0"); // Exemple : 00000123
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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

      {/* Bouton "Retrait" */}
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
        endIcon={<LocalAtmIcon sx={{ fontSize: 30 }} />}
      >
        Retrait
      </Button>

      {/* Infos compte */}
      <Stack
        direction="row"
        spacing={10}
        alignItems="center"
        justifyContent="center"
        mt={4}
        mb={6}
      >
        <Box textAlign="center">
          <Typography variant="h6">Compte à vue</Typography>
          <Typography variant="h5" fontWeight="bold">
            {idCompteUtilisateur ? formatAccountId(idCompteUtilisateur) : "XXXX XXXX XXX"}
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h6">Solde disponible</Typography>
          <Typography variant="h5" fontWeight="bold">
            {balance !== null ? `MGA ${balance.toLocaleString("fr-FR")}` : "MGA XXXXXXXXXX"}
          </Typography>
        </Box>
      </Stack>

      {/* Titre Montant */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Montant à retirer (MGA)
      </Typography>

      {/* Boutons de montants */}
      <Grid container spacing={2} maxWidth="sm" justifyContent="center">
        {[100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, "Autres montants"].map(
          (value, index) => (
            <Grid item xs={4} key={index}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ height: 60, fontSize: "1rem", borderRadius: 2 }}
                onClick={() => handleAmountClick(value)}
              >
                {typeof value === "number" ? value.toLocaleString("fr-FR") : value}
              </Button>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

export default WithdrawPage;
