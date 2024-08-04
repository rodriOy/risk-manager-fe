import React, { useState } from 'react';
import axios from 'axios';

function MedidaForm() {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/medidas', { medida: nombre })
      .then(response => {
        console.log('Medida de seguridad creada:', response.data);
        setNombre('');
      })
      .catch(error => {
        console.error('Error al crear medida de seguridad:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de la Medida:
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
      </label>
      <button type="submit">Crear Medida</button>
    </form>
  );
}

export default MedidaForm;
