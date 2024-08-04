import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/categorias')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error al obtener categorías:', error);
      });
  }, []);

  return (
    <div>
      <h2>Categorías</h2>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.idcategoria}>{categoria.categorianombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriaList;
