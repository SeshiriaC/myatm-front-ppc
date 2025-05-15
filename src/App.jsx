import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importation de react-router-dom

// Importation des composants
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import AdminDashboard from "./components/AdminDashboard";
import BalancePage from "./components/BalancePage";
import WithdrawPage from "./components/WithdrawPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Définition de la route pour la page de connexion */}
        <Route path="/" element={<LoginPage />} />

        {/* Définition de la route pour la page d'accueil */}
        <Route path="/home" element={<HomePage />} />

        {/* Route pour l'interface admin */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/balance" element={<BalancePage />} />

        <Route path="/withdraw" element={<WithdrawPage />} />
      </Routes>
    </Router>
  );
};

export default App;
