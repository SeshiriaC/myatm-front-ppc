import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  Button,
  Box,
  Grid,
  Stack,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { getBalance, effectuerRetrait } from "../services/apiService";

const WithdrawPage = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [idCompteUtilisateur, setIdCompteUtilisateur] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [customAmountOpen, setCustomAmountOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

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
    if (typeof amount === "number") {
      setSelectedAmount(amount);
      setConfirmationOpen(true);
    } else {
      // "Autres montants"
      setCustomAmountOpen(true);
    }
  };

  const confirmerRetrait = async () => {
    setConfirmationOpen(false);
    try {
      await effectuerRetrait(selectedAmount);
      setSuccessMessage(
        `Retrait de MGA ${selectedAmount.toLocaleString("fr-FR")} effectué avec succès`
      );
      setShowOptions(true);

      const data = await getBalance();
      setBalance(data.balance);
    } catch (err) {
      console.error("Erreur de retrait :", err);
      alert(err.response?.data?.message || "Échec du retrait.");
    }
  };

  const validerMontantPersonnalise = () => {
    const amount = parseInt(customAmount, 10);
    if (isNaN(amount) || amount < 5000 || amount > 600000) {
      alert("Veuillez entrer un montant valide entre 5 000 et 600 000 MGA.");
      return;
    }
    setCustomAmountOpen(false);
    setSelectedAmount(amount);
    setConfirmationOpen(true);
  };

  const formatAccountId = (id) => String(id).padStart(8, "0");

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
            {idCompteUtilisateur
              ? formatAccountId(idCompteUtilisateur)
              : "XXXXXXXX"}
          </Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h6">Solde disponible</Typography>
          <Typography variant="h5" fontWeight="bold">
            {balance !== null
              ? `MGA ${balance.toLocaleString("fr-FR")}`
              : "MGA --------"}
          </Typography>
        </Box>
      </Stack>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Montant à retirer (MGA)
      </Typography>

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

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {showOptions && (
        <Stack direction="row" spacing={4} mt={4}>
          <Button variant="outlined" onClick={() => navigate("/home")}>
            Nouvelle opération
          </Button>
          <Button variant="contained" onClick={() => navigate("/")}>
            Quitter
          </Button>
        </Stack>
      )}

      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle fontWeight="bold">Retrait</DialogTitle>
        <DialogContent>
          <Typography>
            Vous allez procéder au retrait de <br />
            <strong>
              MGA {selectedAmount?.toLocaleString("fr-FR")}
            </strong>
            .
          </Typography>
          <Typography mt={2}>
            Êtes-vous sûr de vouloir continuer ?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={() => setConfirmationOpen(false)}
            variant="outlined"
            startIcon={<CloseIcon />}
            sx={{ borderRadius: 4 }}
          >
            Non
          </Button>
          <Button
            onClick={confirmerRetrait}
            variant="outlined"
            startIcon={<CheckIcon />}
            sx={{ borderRadius: 4 }}
          >
            Oui
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={customAmountOpen} onClose={() => setCustomAmountOpen(false)}>
        <DialogTitle fontWeight="bold">Retrait</DialogTitle>
        <DialogContent>
          <Typography>
            Veuillez saisir le montant à retirer (MGA 5 000 - 600 000) :
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="dense"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            type="number"
            inputProps={{ min: 5000, max: 600000 }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={() => setCustomAmountOpen(false)}
            variant="outlined"
            startIcon={<CloseIcon />}
            sx={{ borderRadius: 4 }}
          >
            Annuler
          </Button>
          <Button
            onClick={validerMontantPersonnalise}
            variant="outlined"
            startIcon={<CheckIcon />}
            sx={{ borderRadius: 4 }}
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WithdrawPage;