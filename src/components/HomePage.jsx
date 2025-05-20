import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Import des icônes MUI
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigateToOperations = () => {
    navigate("/operations");
  };

  const handleNavigateToBalance = () => {
    navigate("/balance");
  };

  const handleNavigateToWithdraw = () => {
    navigate("/withdraw");
  };

  const handleNavigateToDeposit = () => {
    navigate("/deposit");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idCompteUtilisateur");
    localStorage.removeItem("role");

    console.log("Logout - après clear localStorage", {
      token: localStorage.getItem("token"),
      idCompteUtilisateur: localStorage.getItem("idCompteUtilisateur"),
      role: localStorage.getItem("role"),
    });

    navigate("/");
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
          maxWidth: "850px",
          height: "100%",
          maxHeight: "600px",
        }}
      >
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
              Bienvenue, veuillez choisir une action.
            </Typography>
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: "50%",
            gap: 4,
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<AccountBalanceWalletIcon />}
            sx={{
              backgroundColor: "#646cff",
              "&:hover": { backgroundColor: "#535bf2" },
              width: "350px",
              borderRadius: "50px",
              padding: "12px 30px",
              textTransform: "none",
            }}
            onClick={handleNavigateToBalance}
          >
            Consultation de solde
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<SwapHorizIcon />}
            sx={{
              backgroundColor: "#646cff",
              "&:hover": { backgroundColor: "#535bf2" },
              width: "350px",
              borderRadius: "30px",
              padding: "12px 30px",
              textTransform: "none",
            }}
            onClick={handleNavigateToOperations}
          >
            Historique des opérations
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<MonetizationOnIcon />}
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#43a047" },
              width: "350px",
              borderRadius: "30px",
              padding: "12px 30px",
              textTransform: "none",
            }}
            onClick={handleNavigateToDeposit}
          >
            Dépôt d'argent
          </Button>

          <Button
            variant="contained"
            size="large"
            startIcon={<AttachMoneyIcon />}
            sx={{
              backgroundColor: "#646cff",
              "&:hover": { backgroundColor: "#535bf2" },
              width: "350px",
              borderRadius: "30px",
              padding: "12px 30px",
              textTransform: "none",
            }}
            onClick={handleNavigateToWithdraw}
          >
            Retrait
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<ExitToAppIcon />}
            sx={{
              borderColor: "#646cff",
              color: "#646cff",
              "&:hover": { borderColor: "#535bf2", color: "#535bf2" },
              width: "350px",
              borderRadius: "30px",
              padding: "12px 30px",
              textTransform: "none",
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
