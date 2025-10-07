const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'Servicio SOA con Node.js funcionando correctamente' });
});

// Endpoint GET /clientes
app.get('/clientes', (req, res) => {
  const clientes = [
    { id: 1, nombre: 'Juan Pérez', correo: 'juan.perez@empresa.com', ciudad: 'Bogotá' },
    { id: 2, nombre: 'María Gómez', correo: 'maria.gomez@empresa.com', ciudad: 'Medellín' },
    { id: 3, nombre: 'Carlos López', correo: 'carlos.lopez@empresa.com', ciudad: 'Cali' },
  ];
  res.json(clientes);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
