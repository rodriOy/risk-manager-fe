import React from 'react';
import CategoriaList from './components/CategoriaList';
import CategoriaForm from './components/CategoriaForm';
import SeccionList from './components/SeccionList';
import SeccionForm from './components/SeccionForm';
import MedidaList from './components/MedidaList';
import MedidaForm from './components/MedidaForm';

function App() {
  return (
    <div className="App">
      <h1>Gestión de Categorías, Secciones y Medidas de Seguridad</h1>
      <CategoriaForm />
      <CategoriaList />
      <SeccionForm />
      <SeccionList />
      <MedidaForm />
      <MedidaList />
    </div>
  );
}

export default App;
