import React, { useState } from 'react';
import { login } from './services/apiService'; // Assurez-vous que la fonction login existe et est correctement importée
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importer les composants MUI nécessaires pour styliser la page
import { TextField, Button, Typography, Container, Box, Paper } from '@mui/material';

const App = () => {
  const [userId, setUserId] = useState('');
  const [userPinCode, setUserPinCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(userId, userPinCode); // Appel API pour la connexion
      localStorage.setItem('token', data.token); // Stocker le token JWT
      window.location.href = '/home'; // Rediriger vers la page d'accueil après connexion
    } catch (err) {
      setError('Identifiant ou code PIN incorrect'); // Afficher une erreur si la connexion échoue
    }
  };

  return (
    <Router>
      <Routes>
        {/* Définition de la route pour la page de connexion */}
        <Route
          path="/"
          element={
            <Container maxWidth="xs">
              <Paper
                sx={{
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h4" component="h1" gutterBottom>
                  myATM
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Veuillez saisir vos identifiants de connexion
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <TextField
                    label="Adresse e-mail"
                    variant="outlined"
                    fullWidth
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    label="Code PIN"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={userPinCode}
                    onChange={(e) => setUserPinCode(e.target.value)}
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      backgroundColor: '#646cff',
                      '&:hover': {
                        backgroundColor: '#535bf2',
                      },
                    }}
                  >
                    Se connecter
                  </Button>
                </form>

                {error && (
                  <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
              </Paper>
            </Container>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

