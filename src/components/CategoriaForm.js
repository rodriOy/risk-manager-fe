import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

function CategoriaForm() {
  const [nombre, setNombre] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/categorias', {
      categorianombre: nombre
    })
      .then(response => {
        setMessage('Categoría creada exitosamente');
        setNombre('');
      })
      .catch(error => {
        setMessage('Error: ' + error.response.data.error);
      });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Crear Nueva Categoría
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

export default CategoriaForm;
