import React, { useState } from 'react';
import axios from 'axios';

function SeccionForm() {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/secciones', { seccion_nombre: nombre })
      .then(response => {
        console.log('Sección creada:', response.data);
        setNombre('');
      })
      .catch(error => {
        console.error('Error al crear sección:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de la Sección:
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
      </label>
      <button type="submit">Crear Sección</button>
    </form>
  );
}

export default SeccionForm;
