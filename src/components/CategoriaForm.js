import React, { useState } from 'react';
import axios from 'axios';

function CategoriaForm() {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/categorias', { categorianombre: nombre })
      .then(response => {
        console.log('Categoría creada:', response.data);
        setNombre('');
      })
      .catch(error => {
        console.error('Error al crear categoría:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de la Categoría:
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
      </label>
      <button type="submit">Crear Categoría</button>
    </form>
  );
}

export default CategoriaForm;
