import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import apiRest from "../services/apiService"; // Import axios configuré avec JWT

const TransactionHistoryPage = () => {
  const navigate = useNavigate();
  const [operationsData, setOperationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistorique = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await apiRest.get("/operations/historique");
        setOperationsData(response.data);
        console.log("Operations reçues :", response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Erreur lors du chargement de l'historique"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistorique();
  }, []);

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <Box sx={{ padding: 4, position: "relative" }}>
      {/* Bouton retour */}
      <IconButton
        onClick={handleGoBack}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: 3,
          "&:hover": { backgroundColor: "#333" },
        }}
        aria-label="Retour"
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            border: "1px solid black",
            borderRadius: 10,
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            fontSize: "1.2rem",
          }}
        >
          <Typography sx={{ mr: 1 }}>Historique des opérations</Typography>
          <SwapHorizIcon />
        </Box>
      </Box>

      {/* Gestion chargement / erreur */}
      {loading && (
        <Box sx={{ mt: 12, textAlign: "center" }}>
          <CircularProgress />
          <Typography>Chargement de l'historique...</Typography>
        </Box>
      )}

      {error && (
        <Box sx={{ mt: 12 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Table des opérations */}
      {!loading && !error && (
        <TableContainer component={Paper} sx={{ mt: 10, boxShadow: "none" }}>
          <Table aria-label="Historique des opérations">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Opérations</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight="bold">Montant</Typography>
                </TableCell>
              </TableRow>
              {operationsData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography>Aucune opération trouvée.</Typography>
                  </TableCell>
                </TableRow>
              )}
              {operationsData.map((op, index) => {
                const isRetrait = op.denominationOperation
                  ?.toLowerCase()
                  .includes("retrait");
                const montantColor = isRetrait ? "error.main" : "success.main";

                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography fontWeight={600}>
                        {new Date(op.dateOperation).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">
                        {op.denominationOperation || "Opération"}
                      </Typography>
                      <Typography color="gray">Réf: {op.idOperation}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={600} color={montantColor}>
                        MGA {Number(op.valeur).toLocaleString("fr-FR")}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination & Télécharger */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
        }}
      >
        {/* Pagination simple */}
        <Box>
          <Button disabled>&lt;</Button>
          <Button variant="outlined">1</Button>
          <Button disabled>&gt;</Button>
        </Box>

        {/* Download button (à implémenter) */}
        <Button
          variant="outlined"
          endIcon={<DownloadIcon />}
          sx={{ borderRadius: 10 }}
          onClick={() => alert("Fonction téléchargement à implémenter")}
        >
          Télécharger
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionHistoryPage;
