import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import showsRouter from './routes/shows';
import packagesRouter from './routes/packages';

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middlewares
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Las Trafic De Alberto API', timestamp: new Date().toISOString() });
});

// Rutas
app.use('/api/shows', showsRouter);
app.use('/api/packages', packagesRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚐 Las Trafic API corriendo en http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
});
