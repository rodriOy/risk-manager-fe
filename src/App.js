import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import CategoriaList from './components/CategoriaList';
import CategoriaForm from './components/CategoriaForm';
import SeccionList from './components/SeccionList';
import SeccionForm from './components/SeccionForm';
import MedidaList from './components/MedidaList';
import MedidaForm from './components/MedidaForm';
import AssociateSeccionMedida from './components/AssociateSeccionMedida';
import AudioRecorder from "./components/InsuranceForm";

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Bienvenido a Risk Manager
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <nav>
            <List>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/categorias">
                  <ListItemText primary="Categorías" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/secciones">
                  <ListItemText primary="Secciones" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/medidas">
                  <ListItemText primary="Medidas de Seguridad" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/associate-seccion-medida">
                  <ListItemText primary="Asociar Sección con Medida" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/insurance-form">
                  <ListItemText primary="Formulario de Seguro" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Routes>
            <Route path="/categorias" element={<><CategoriaForm /><CategoriaList /></>} />
            <Route path="/secciones" element={<><SeccionForm /><SeccionList /></>} />
            <Route path="/medidas" element={<><MedidaForm /><MedidaList /></>} />
            <Route path="/associate-seccion-medida" element={<AssociateSeccionMedida />} />
            <Route path="/insurance-form" element={<AudioRecorder />} />

            <Route path="/" element={
              <div>

              </div>
            } />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
