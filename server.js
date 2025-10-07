// server.js - ejemplo simple de servicio REST con validación de API Key
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const VALID_API_KEYS = (process.env.VALID_API_KEYS || "abc123,def456").split(',');
const SERVICE_ID = process.env.SERVICE_ID || "productos-service";
const SERVICE_PORT = process.env.PORT || 3000;
const CONSUL_URL = process.env.CONSUL_URL || "http://localhost:8500";

app.use(express.json());

// Middleware de seguridad con API Key
function apiKeyMiddleware(req, res, next) {
  const key = req.header('x-api-key');
  if (!key) return res.status(401).json({ error: 'API key missing' });
  if (!VALID_API_KEYS.includes(key)) return res.status(403).json({ error: 'Invalid API key' });
  next();
}

// Ruta pública (health check)
app.get('/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Ruta protegida
app.get('/api/products/:id', apiKeyMiddleware, (req, res) => {
  const id = req.params.id;
  const product = { id, name: "Camiseta deportiva", price: 49.90, currency: "COP", stock: 23 };
  res.json(product);
});

// Registro automático en Consul (opcional)
async function registerInConsul() {
  try {
    const payload = {
      ID: SERVICE_ID + "-" + SERVICE_PORT,
      Name: SERVICE_ID,
      Address: "localhost",
      Port: parseInt(SERVICE_PORT),
      Check: { HTTP: `http://localhost:${SERVICE_PORT}/health`, Interval: "10s", Timeout: "2s" },
      Meta: { version: "1.0.0", protocol: "REST" }
    };
    await axios.put(`${CONSUL_URL}/v1/agent/service/register`, payload);
    console.log('Registered in Consul:', payload.ID);
  } catch (err) { console.warn('Consul registration failed:', err.message); }
}

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await registerInConsul();
=======
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
>>>>>>> 426a5ba0790c226f5383b80cbab4e6249efbe4d0
});
