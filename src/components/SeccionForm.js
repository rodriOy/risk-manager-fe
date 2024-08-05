import React, { useState } from 'react';
import axios from 'axios';
import {Button, TextField, Typography} from "@mui/material";


function SeccionForm() {
  const [nombre, setNombre] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/secciones', {
      seccion_nombre: nombre
    })
      .then(response => {
        setMessage('Seccion creada exitosamente');
        setNombre('');
      })
      .catch(error => {
        setMessage('Error: ' + error.response.data.error);
      });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Crear Nueva Sección
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
export default SeccionForm;
