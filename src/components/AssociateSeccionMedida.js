import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssociateSeccionMedida() {
  const [secciones, setSecciones] = useState([]);
  const [medidas, setMedidas] = useState([]);
  const [selectedSeccion, setSelectedSeccion] = useState('');
  const [selectedMedida, setSelectedMedida] = useState('');
  const [cotainf, setCotainf] = useState('');
  const [cotasup, setCotasup] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/secciones')
      .then(response => {
        setSecciones(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the sections!', error);
      });

    axios.get('http://127.0.0.1:5000/medidas')
      .then(response => {
        setMedidas(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the measures!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/associate_seccion_medida', {
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
    <div>
      <h2>Asociar Sección con Medida de Seguridad</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sección:</label>
          <select value={selectedSeccion} onChange={(e) => setSelectedSeccion(e.target.value)}>
            <option value="">Selecciona una sección</option>
            {secciones.map(seccion => (
              <option key={seccion.seccion_id} value={seccion.seccion_id}>{seccion.seccion_nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Medida de Seguridad:</label>
          <select value={selectedMedida} onChange={(e) => setSelectedMedida(e.target.value)}>
            <option value="">Selecciona una medida</option>
            {medidas.map(medida => (
              <option key={medida.idmedidasseguridad} value={medida.idmedidasseguridad}>{medida.medida}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Cota Inferior:</label>
          <input type="number" value={cotainf} onChange={(e) => setCotainf(e.target.value)} />
        </div>
        <div>
          <label>Cota Superior:</label>
          <input type="number" value={cotasup} onChange={(e) => setCotasup(e.target.value)} />
        </div>
        <button type="submit">Asociar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AssociateSeccionMedida;
