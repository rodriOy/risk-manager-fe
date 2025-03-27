import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, TextField, MenuItem, Button, Box, Alert } from '@mui/material';

function AssociateSeccionMedida() {
  const [secciones, setSecciones] = useState([]);
  const [medidas, setMedidas] = useState([]);
  const [selectedSeccion, setSelectedSeccion] = useState('');
  const [selectedMedida, setSelectedMedida] = useState('');
  const [cotainf, setCotainf] = useState('');
  const [cotasup, setCotasup] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://104.197.90.87:5000/secciones')
      .then(response => {
        setSecciones(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sections!', error);
      });

    axios.get('http://104.197.90.87:5000/medidas')
      .then(response => {
        setMedidas(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the measures!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://104.197.90.87:5000/associate_seccion_medida', {
      seccion_id: selectedSeccion,
      medida_id: selectedMedida,
      cotainf: cotainf,
      cotasup: cotasup
    })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage('Error: ' + error.response.data.error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Asociar Sección con Medida de Seguridad</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          select
          label="Sección"
          value={selectedSeccion}
          onChange={(e) => setSelectedSeccion(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="">
            <em>Selecciona una sección</em>
          </MenuItem>
          {secciones.map(seccion => (
            <MenuItem key={seccion.seccion_id} value={seccion.seccion_id}>
              {seccion.seccion_nombre}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Medida de Seguridad"
          value={selectedMedida}
          onChange={(e) => setSelectedMedida(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="">
            <em>Selecciona una medida</em>
          </MenuItem>
          {medidas.map(medida => (
            <MenuItem key={medida.idmedidasseguridad} value={medida.idmedidasseguridad}>
              {medida.medida}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Cota Inferior"
          type="number"
          value={cotainf}
          onChange={(e) => setCotainf(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cota Superior"
          type="number"
          value={cotasup}
          onChange={(e) => setCotasup(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Asociar
        </Button>
      </Box>
      {message && <Alert severity={message.includes('Error') ? 'error' : 'success'}>{message}</Alert>}
    </Container>
  );
}

export default AssociateSeccionMedida;
