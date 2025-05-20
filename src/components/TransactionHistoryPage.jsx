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
import apiRest from "../services/apiService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  // Fonction de formatage manuel avec espaces simples entre milliers
  const formatNumberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleDownloadPDF = () => {
    if (operationsData.length === 0) {
      alert("Aucune opération à télécharger.");
      return;
    }

    const doc = new jsPDF();

    doc.text("Historique des opérations", 14, 20);

    const columns = [
      { header: "Date", dataKey: "date" },
      { header: "Opération", dataKey: "operation" },
      { header: "Référence", dataKey: "reference" },
      { header: "Montant", dataKey: "amount" },
    ];

    const rows = operationsData.map((op) => {
      const timestamp = new Date(op.dateOperation).getTime();
      const firstLetter = op.denominationOperation
        ? op.denominationOperation.charAt(0).toUpperCase()
        : "X";
      const userId = op.idCompteUtilisateur ?? "0";
      const reference = `REF${timestamp}${firstLetter}${userId}`;

      // Formatage manuel sans caractères invisibles
      const amountFormatted = formatNumberWithSpaces(Math.round(op.valeur));

      return {
        date: new Date(op.dateOperation).toLocaleString("fr-FR"),
        operation: op.denominationOperation || "Opération",
        reference: reference,
        amount: `MGA ${amountFormatted}`,
      };
    });

    autoTable(doc, {
      startY: 30,
      columns,
      body: rows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [100, 100, 100] },
    });

    doc.save("historique_operations.pdf");
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
            top: 24,
            right: 24,
            borderRadius: "32px",
            paddingX: 4,
            paddingY: 1.5,
            fontSize: "1.25rem",
            border: "1px solid black",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#000",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          HISTORIQUE DES OPÉRATIONS
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

                const timestamp = new Date(op.dateOperation).getTime();
                const firstLetter = op.denominationOperation
                  ? op.denominationOperation.charAt(0).toUpperCase()
                  : "X";
                const userId = op.idCompteUtilisateur ?? "0";
                const reference = `REF${timestamp}${firstLetter}${userId}`;

                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography fontWeight={600}>
                        {new Date(op.dateOperation).toLocaleDateString(
                          "fr-FR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">
                        {op.denominationOperation || "Opération"}
                      </Typography>
                      <Typography color="gray">Réf: {reference}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight={600} color={montantColor}>
                        MGA {formatNumberWithSpaces(Math.round(op.valeur))}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Télécharger */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Button
          variant="outlined"
          endIcon={<DownloadIcon />}
          sx={{ borderRadius: 10 }}
          onClick={handleDownloadPDF}
        >
          Télécharger
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionHistoryPage;
