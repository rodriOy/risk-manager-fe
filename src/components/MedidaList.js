import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {List, ListItem, ListItemText, Typography} from "@mui/material";

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
      <Typography variant="h5" gutterBottom>
        Lista de Medidas de seguridad
      </Typography>
      <List>
        {medidas.map((medida) => (
          <ListItem key={medida.idmedidasseguridad}>
            <ListItemText primary={medida.medida} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
export default MedidaList;
