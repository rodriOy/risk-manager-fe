import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Autocomplete, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import axios from 'axios';

function InsuranceForm() {
  const [departureDate, setDepartureDate] = useState('');
  const [goods, setGoods] = useState([]);
  const [selectedGood, setSelectedGood] = useState(null);
  const [insuredSum, setInsuredSum] = useState('');
  const [message, setMessage] = useState('');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [securityMeasures, setSecurityMeasures] = useState([]);

  useEffect(() => {
    if (inputText.length < 3) {
      setGoods([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      setLoading(true);
      axios.post('http://127.0.0.1:5000/predict', { text: inputText })
        .then(response => {
          setGoods(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching predictions:', error);
          setLoading(false);
        });
    }, 300); // 300ms delay before making API call

    return () => clearTimeout(timeoutId);
  }, [inputText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGood) {
      setMessage('Error: Debes seleccionar una mercadería.');
      return;
    }
    axios.get(`http://127.0.0.1:5000/mercaderia/${selectedGood.id}?SAT=${insuredSum}`)
      .then(response => {
        setSecurityMeasures(response.data.medidas);
        setOpenDialog(true);
      })
      .catch(error => {
        setMessage('Error al enviar el formulario');
      });
  };

  const handleClose = () => {
    setOpenDialog(false);
    setMessage('Formulario enviado con éxito');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Formulario de Seguro
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          label="Fecha de Salida"
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="normal"
        />
        <Autocomplete
          options={goods}
          getOptionLabel={(option) => option.text}
          onInputChange={(event, newInputValue) => setInputText(newInputValue)}
          onChange={(event, newValue) => setSelectedGood(newValue)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Mercadería"
              margin="normal"
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <TextField
          label="Suma Asegurada"
          type="number"
          value={insuredSum}
          onChange={(e) => setInsuredSum(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Enviar
        </Button>
      </Box>
      {message && <Alert severity={message.includes('Error') ? 'error' : 'success'}>{message}</Alert>}

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Medidas de Seguridad Requeridas</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estimado usuario, para la mercadería que desea transportar se requieren las siguientes medidas de seguridad:
          </DialogContentText>
          <ul>
            {securityMeasures.map((measure, index) => (
              <li key={index}>{measure.medida}</li>
            ))}
          </ul>
          <DialogContentText>
            Recuerde que la aplicacion de las mismas condiciona la cobertura de la Póliza
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default InsuranceForm;
