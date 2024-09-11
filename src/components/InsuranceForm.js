import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

function InsuranceForm() {
  const [mercaderia, setMercaderia] = useState('');
  const [SAT, setSAT] = useState('');
  const [fecha, setFecha] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const handleSATChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');  // Solo números
    setSAT(rawValue ? Number(rawValue) : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mercaderia || !SAT || !fecha || !origen || !destino) {
      setMessage('Por favor, completa todos los campos');
      return;
    }

    if (fecha < today) {
      setError('La fecha no puede ser anterior a hoy');
      return;
    } else {
      setError('');
    }

    axios.get(`http://127.0.0.1:5000/mercaderia`, {
      params: {
        SAT: parseInt(SAT, 10),
        mercaderia: mercaderia
      }
    })
    .then(response => {
      setDetails(response.data);
      setOpenDialog(true);
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage('Error: ' + error.response.data.error);
      } else {
        setMessage('Error al obtener los detalles de la mercadería');
      }
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Formulario de Seguro
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          label="Mercadería"
          value={mercaderia}
          onChange={(e) => setMercaderia(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Suma Asegurada (SAT)"
          value={formatCurrency(SAT)}  // Muestra el valor formateado como moneda
          onChange={handleSATChange}  // Formatea el valor al cambiar
          fullWidth
          margin="normal"
          inputProps={{ inputMode: 'numeric' }}  // Solo acepta números
        />
        <TextField
          label="Fecha de Seguro"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
          inputProps={{ min: today }}
        />
        <TextField
          label="Lugar de Origen"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Lugar de Destino"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Enviar
        </Button>
      </Box>
      {message && <Alert severity={message.includes('Error') ? 'error' : 'success'}>{message}</Alert>}

      {/* Pop-up para mostrar las medidas de seguridad */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Medidas de Seguridad</DialogTitle>
        <DialogContent>
          {details && (
            <Typography>
              Para la mercadería <strong>{mercaderia}</strong> que sale el día <strong>{fecha}</strong> de <strong>{origen}</strong> a <strong>{destino}</strong> por el valor de <strong>{formatCurrency(SAT)}</strong>, se requieren las siguientes medidas de seguridad:
            </Typography>
          )}
          {details?.medidas?.map((medida, index) => (
            <Typography key={index} sx={{ mt: 2 }}>
              - {medida.medida}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default InsuranceForm;
