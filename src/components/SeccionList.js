import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SeccionList() {
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/secciones')
      .then(response => {
        setSecciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener secciones:', error);
      });
  }, []);

  return (
    <div>
      <h2>Secciones</h2>
      <ul>
        {secciones.map(seccion => (
          <li key={seccion.seccion_id}>{seccion.seccion_nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default SeccionList;
