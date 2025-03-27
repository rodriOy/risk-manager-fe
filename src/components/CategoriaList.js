import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get('/api/categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error al obtener categorías:', error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Lista de Categorías
      </Typography>
      <List>
        {categorias.map((categoria) => (
          <ListItem key={categoria.idcategoria}>
            <ListItemText primary={categoria.categorianombre} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default CategoriaList;
