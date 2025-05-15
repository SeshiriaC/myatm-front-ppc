import React from "react";
import {
  Container,
  Typography,
  IconButton,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const BalancePage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home"); // Modifie le chemin si nécessaire
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
            XXXX XXXX XXX
          </Typography>
        </Box>

        {/* Bloc "Montant disponible" */}
        <Box textAlign="center">
          <Typography variant="h6" gutterBottom>
            Montant disponible
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            MGA &nbsp; XXXXXXXXXX
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default BalancePage;
