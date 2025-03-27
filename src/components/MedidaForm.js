import React, { useState } from 'react';
import axios from 'axios';
import {Button, TextField, Typography} from "@mui/material";

function MedidaForm() {
  const [nombre, setNombre] = useState('');
  const [message, setMessage] = useState(''); // Define and initialize the message state variable

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/medidas', {
      medida: nombre
    })
      .then(response => {
        setMessage('Medida de seguridad creada exitosamente');
        setNombre('');
      })
      .catch(error => {
        setMessage('Error: ' + error.response.data.error);
      });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Crear Nueva Medida de Seguridad
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de la Categoría"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Crear
        </Button>
      </form>
      {message && <Typography variant="body1">{message}</Typography>}
    </div>
  );
}

export default MedidaForm;