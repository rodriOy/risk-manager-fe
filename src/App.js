import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CategoriaList from './components/CategoriaList';
import CategoriaForm from './components/CategoriaForm';
import SeccionList from './components/SeccionList';
import SeccionForm from './components/SeccionForm';
import MedidaList from './components/MedidaList';
import MedidaForm from './components/MedidaForm';
import AssociateSeccionMedida from './components/AssociateSeccionMedida';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Gestión de Categorías, Secciones y Medidas de Seguridad</h1>
        <nav>
          <ul>
            <li><Link to="/categorias">Categorías</Link></li>
            <li><Link to="/secciones">Secciones</Link></li>
            <li><Link to="/medidas">Medidas de Seguridad</Link></li>
            <li><Link to="/associate-seccion-medida">Asociar Sección con Medida</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/categorias" element={<><CategoriaForm /><CategoriaList /></>} />
          <Route path="/secciones" element={<><SeccionForm /><SeccionList /></>} />
          <Route path="/medidas" element={<><MedidaForm /><MedidaList /></>} />
          <Route path="/associate-seccion-medida" element={<AssociateSeccionMedida />} />
          <Route path="/" element={
            <div>
              <h2>Bienvenido a la página principal</h2>
              <p>Utiliza el menú para navegar.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;