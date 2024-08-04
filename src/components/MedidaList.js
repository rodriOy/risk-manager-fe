import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MedidaList() {
  const [medidas, setMedidas] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/medidas')
      .then(response => {
        setMedidas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener medidas de seguridad:', error);
      });
  }, []);

  return (
    <div>
      <h2>Medidas de Seguridad</h2>
      <ul>
        {medidas.map(medida => (
          <li key={medida.idmedidasseguridad}>{medida.medida}</li>
        ))}
      </ul>
    </div>
  );
}

export default MedidaList;
