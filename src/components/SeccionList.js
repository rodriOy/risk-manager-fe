import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {List, ListItem, ListItemText, Typography} from "@mui/material";

function SeccionList() {
  const [secciones, setSecciones] = useState([]);

  useEffect(() => {
    axios.get('/api/secciones')
      .then(response => {
        setSecciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener secciones:', error);
      });
  }, []);


  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Lista de Secciones
      </Typography>
      <List>
        {secciones.map((seccion) => (
          <ListItem key={seccion.seccion_id}>
            <ListItemText primary={seccion.seccion_nombre} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
export default SeccionList;
